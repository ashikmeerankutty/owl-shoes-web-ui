import { Box } from "@twilio-paste/core";
import { FC, useState } from "react";
import { useSelector } from "react-redux";

import { VideoCallStarting } from "../../../VideoCallStarting";
import { useRoomState } from "../../hooks/useRoomState";
import { Participants } from "../Participants/Participants";
import { useVideo } from "../VideoProvider/VideoProvider";
import { AppState } from "../../../../store/definitions";

export const VideoChatWidget: FC = () => {
    const roomState = useRoomState();
    const { isConnecting } = useVideo();

    const { conversation } = useSelector((state: AppState) => ({
        conversation: state.chat.conversation
    }));

    const sendMessage = async (messageText: string) => {
        if (!conversation) {
            return;
        }
        let preparedMessage = conversation.prepareMessage();
        preparedMessage = preparedMessage.setBody(messageText).setAttributes({ isInfoMessage: true });
        await preparedMessage.build().send();
    };

    if (roomState !== "connected" && !isConnecting) {
        return null;
    }

    return <Box>{roomState === "connected" && <Participants />}</Box>;
};
