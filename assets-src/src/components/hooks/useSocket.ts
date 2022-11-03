import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

import { PRESENCE_ENDPOINT } from "../api/constants";

export interface SyncData {
    agentAvailable: boolean;
    taskList: Array<{
        attributes: {
            conversationSid: string;
        };
    }>;
}

const socket = io(PRESENCE_ENDPOINT || "");

export const useSocket = () => {
    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const { userId } = useParams();
    const [syncData, setSyncData] = useState<SyncData>({
        agentAvailable: false,
        taskList: []
    });

    const handleAgentStatus = (data: SyncData) => {
        setSyncData(data);
    };

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected to websocket server");
            setIsConnected(true);
        });

        socket.on("agentStatus", handleAgentStatus);

        socket.emit("agentStatus", {
            agentId: userId
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("pong");
        };
    }, []);

    return {
        syncData,
        isConnected
    };
};
