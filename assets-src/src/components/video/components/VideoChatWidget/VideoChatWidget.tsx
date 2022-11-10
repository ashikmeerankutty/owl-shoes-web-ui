import { Box } from "@twilio-paste/core";
import { FC } from "react";

import { useRoomState } from "../../hooks/useRoomState";
import { Participants } from "../Participants/Participants";
import { useVideo } from "../VideoProvider/VideoProvider";

export const VideoChatWidget: FC = () => {
    const roomState = useRoomState();
    const { isConnecting } = useVideo();

    if (roomState !== "connected" && !isConnecting) {
        return null;
    }

    return <Box>{roomState === "connected" && <Participants />}</Box>;
};
