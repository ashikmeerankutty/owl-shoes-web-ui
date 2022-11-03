import { useEffect, useState } from "react";
import { RemoteParticipant } from "twilio-video";

import { useVideo } from "../components/VideoProvider/VideoProvider";

export const useParticipants = () => {
    const { room } = useVideo();
    const [participants, setParticipants] = useState(Array.from(room?.participants.values() ?? []));

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (room) {
            const participantConnected = (participant: RemoteParticipant) => {
                setParticipants((prevParticipants) => [...prevParticipants, participant]);
            };
            const participantDisconnected = (participant: RemoteParticipant) => {
                setParticipants((prevParticipants) => prevParticipants.filter((p) => p !== participant));
                // When participant is disconnected disconnect the room
                room.disconnect();
            };
            room.on("participantConnected", participantConnected);
            room.on("participantDisconnected", participantDisconnected);
            return () => {
                room.off("participantConnected", participantConnected);
                room.off("participantDisconnected", participantDisconnected);
            };
        }
    }, [room]);

    return participants;
};
