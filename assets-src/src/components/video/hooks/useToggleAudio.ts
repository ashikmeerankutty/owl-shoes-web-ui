import { useState } from "react";

import { useVideo } from "../components/VideoProvider/VideoProvider";

export const useToggleAudio = () => {
    const [audioMuted, setAudioMuted] = useState<boolean>(false);
    const { room } = useVideo();

    const onToggleAudio = () => {
        if (!room || !room.localParticipant) {
            return;
        }
        room.localParticipant.audioTracks.forEach((publication) => {
            if (publication.track.isEnabled) {
                publication.track.disable();
                setAudioMuted(true);
            } else {
                publication.track.enable();
                setAudioMuted(false);
            }
        });
    };

    return { audioMuted, onToggleAudio };
};
