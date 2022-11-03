import { useEffect, useState } from "react";

import { useVideo } from "../components/VideoProvider/VideoProvider";

type RoomStateType = "disconnected" | "connected" | "reconnecting";

export const useRoomState = () => {
    const { room } = useVideo();
    const [state, setState] = useState<RoomStateType>("disconnected");

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (room) {
            const setRoomState = () => setState(room.state as RoomStateType);
            setRoomState();
            room.on("disconnected", setRoomState).on("reconnected", setRoomState).on("reconnecting", setRoomState);
            return () => {
                room.off("disconnected", setRoomState)
                    .off("reconnected", setRoomState)
                    .off("reconnecting", setRoomState);
            };
        }
    }, [room]);

    return state;
};
