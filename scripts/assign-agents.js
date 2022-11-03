require("dotenv").config();
const Twilio = require("twilio");

const ACCOUNT_SID = process.env["ACCOUNT_SID"];
const AUTH_TOKEN = process.env["AUTH_TOKEN"];

const client = new Twilio(ACCOUNT_SID, AUTH_TOKEN);

const getWorkspaceId = async () => {
    const workspaces = await client.taskrouter.v1.workspaces.list({
        friendlyName: "Flex Task Assignment"
    });
    if (!workspaces.length) {
        return null;
    }
    return workspaces[0].sid;
};

const getDefaultTaskQueueId = async (workspaceSid) => {
    const taskQueues = await client.taskrouter.v1
        .workspaces(workspaceSid)
        .taskQueues.list({ friendlyName: "Everyone" });
    if (!taskQueues.length) {
        return null;
    }
    return taskQueues[0].sid;
};

const createWorkflowForWorkspace = async (workspaceSid, taskQueueSid) => {
    const workflow = await client.taskrouter.v1.workspaces(workspaceSid).workflows.create({
        friendlyName: "Trasfer to Agent",
        configuration: JSON.stringify({
            task_routing: {
                filters: [
                    {
                        filter_friendly_name: "Default",
                        expression: "1==1",
                        targets: [
                            {
                                queue: taskQueueSid,
                                known_worker_friendly_name: "task.agentId"
                            }
                        ]
                    }
                ]
            }
        })
    });
    return workflow.sid;
};

const getStudioFlowSid = async () => {
    const flows = await client.studio.v1.flows.list();
    const studioFlow = flows.find(({ friendlyName }) => friendlyName === "webchat-flow");
    if (!studioFlow) {
        return null;
    }
    return studioFlow.sid;
};

const getCurrentFlowDefinition = async (flowSid) => {
    const flow = await client.studio.v2.flows(flowSid).fetch();
    return flow.definition;
};

const getUpdatedFlowDefinition = (flowDefinition, workflowSid, taskChannelSid) => {
    return flowDefinition.map((definition) => {
        if (definition.name !== "send_to_flex_agent") {
            return definition;
        }
        return {
            ...definition,
            properties: {
                ...definition.properties,
                workflow: workflowSid,
                channel : taskChannelSid
            }
        };
    });
};

const getTaskChannelSid = async (workspaceSid) => {
    const taskChannels = await client.taskrouter.v1
        .workspaces(workspaceSid)
        .taskChannels.list({ friendlyName: "Programmable Chat" });
    return taskChannels.find(({uniqueName}) => uniqueName === "chat").sid;
};

const updateFlowDefinition = async (flowSid, updatedDefinition) => {
    const updatedFlow = await client.studio.v2.flows(flowSid).update({
        commitMessage: "Update flow definition",
        definition: updatedDefinition,
        status: "published"
    });
    return updatedFlow.friendlyName;
};

const createWorkflow = async () => {
    const workspaceSid = await getWorkspaceId();
    const taskQueueSid = await getDefaultTaskQueueId(workspaceSid);
    let workflowSid = "";
    const workflow = await client.taskrouter.v1
        .workspaces(workspaceSid)
        .workflows.list({ friendlyName: "Trasfer to Agent" });
    if (workflow.length) {
        workflowSid = workflow[0].sid;
    } else {
        workflowSid = await createWorkflowForWorkspace(workspaceSid, taskQueueSid);
    }
    const taskChannelSid = await getTaskChannelSid(workspaceSid);
    const studioFlowSid = await getStudioFlowSid();
    const flowDefinition = await getCurrentFlowDefinition(studioFlowSid);
    const updatedFlowDefinition = {
        ...flowDefinition,
        states: getUpdatedFlowDefinition(flowDefinition.states, workflowSid, taskChannelSid)
    };
    const updatedFlow = await updateFlowDefinition(studioFlowSid, updatedFlowDefinition);
    console.log(updatedFlow);
};

createWorkflow();
