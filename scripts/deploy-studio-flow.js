require("dotenv").config();
const path = require("path");
const fs = require("fs").promises;
const Twilio = require("twilio");

const ACCOUNT_SID = process.env["ACCOUNT_SID"];
const AUTH_TOKEN = process.env["AUTH_TOKEN"];
const ADDRESS_SID = process.env["ADDRESS_SID"];

const client = new Twilio(ACCOUNT_SID, AUTH_TOKEN);

const updateAddressConfiguration = async (flowSid) => {
    const address = await client.conversations.v1.addressConfigurations(ADDRESS_SID).update({
        "autoCreation.studioFlowSid": flowSid
    });
    console.log("Updated Address Config", address.sid);
};

async function run() {
    const filePath = path.resolve(__dirname, "../flows/webchat-flow.json");
    const flow = JSON.parse(await fs.readFile(filePath, "utf8"));
    const friendlyName = "webchat-flow";

    try {
        await client.studio.flowValidate.update({
            definition: flow,
            friendlyName,
            status: "published"
        });
    } catch (err) {
        console.error("Invalid Flow");
        console.dir(err.details);
        return;
    }

    const allFlows = await client.studio.flows.list();
    const existingFlow = allFlows.find((flow) => flow.friendlyName === friendlyName);

    if (!existingFlow) {
        const newFlow = await client.studio.flows.create({
            definition: flow,
            friendlyName,
            status: "published"
        });
        console.log("New Flow", newFlow.webhookUrl);
        updateAddressConfiguration(newFlow.sid);
        return;
    }

    const updatedFlow = await client.studio.flows(existingFlow.sid).update({
        definition: flow,
        status: "published",
        commitMessage: "Automated deployment"
    });
    console.log("Updated flow", updatedFlow.webhookUrl);
    updateAddressConfiguration(updatedFlow.sid);
}

run().catch(console.error);
