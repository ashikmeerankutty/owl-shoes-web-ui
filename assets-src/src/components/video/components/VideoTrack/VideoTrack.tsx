import { Box } from "@twilio-paste/core";
import { useRef, useEffect } from "react";
import { LocalVideoTrack, RemoteVideoTrack } from "twilio-video";

type VideoTrackType = LocalVideoTrack | RemoteVideoTrack;

interface VideoTrackProps {
    track: VideoTrackType;
}

export const VideoTrack = ({ track }: VideoTrackProps) => {
    const ref = useRef<HTMLVideoElement>(null!);

    useEffect(() => {
        const el = ref.current;
        el.muted = true;
        track.attach(el);
        return () => {
            track.detach(el);

            /*
             * This addresses a Chrome issue where the number of WebMediaPlayers is limited.
             * See: https://github.com/twilio/twilio-video.js/issues/1528
             */
            el.srcObject = null;
        };
    }, [track]);

    return <Box height="250px" as="video" maxWidth="100%" ref={ref} />;
};
