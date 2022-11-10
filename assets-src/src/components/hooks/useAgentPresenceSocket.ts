import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { AppState } from "../../store/definitions";
import { SyncData, useSocket } from "./useSocket";

export const useAgentPresenceSocket = () => {
    const [isAgentAvailable, setIsAgentAvailable] = useState(false);
    const { conversationSid } = useSelector((state: AppState) => ({
        conversationSid: state.chat.conversation?.sid || ""
    }));

    const { syncData } = useSocket();

    const updateAgentStatus = (data: SyncData, agentConversationSid: string) => {
        if (Array.isArray(data.taskList)) {
            const currentTask = data.taskList.find(
                ({ attributes }) => attributes.conversationSid === agentConversationSid
            );
            if (currentTask) {
                setIsAgentAvailable(true);
                return;
            }
        }
        setIsAgentAvailable(data.agentAvailable);
    };

    useEffect(() => {
        if (syncData) {
            updateAgentStatus(syncData, conversationSid);
        }
    }, [conversationSid, syncData]);

    return {
        isAgentAvailable
    };
};
