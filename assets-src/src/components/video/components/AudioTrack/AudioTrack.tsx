import { FC, useEffect, useRef } from "react";
import { AudioTrack as IAudioTrack } from "twilio-video";

interface AudioTrackProps {
    track: IAudioTrack;
}

export const AudioTrack: FC<AudioTrackProps> = ({ track }) => {
    const audioEl = useRef<HTMLAudioElement>();

    useEffect(() => {
        audioEl.current = track.attach();
        audioEl.current.setAttribute("data-cy-audio-track-name", track.name);
        document.body.appendChild(audioEl.current);
        return () =>
            track.detach().forEach((el) => {
                el.remove();

                /*
                 * This addresses a Chrome issue where the number of WebMediaPlayers is limited.
                 * See: https://github.com/twilio/twilio-video.js/issues/1528
                 */
                el.srcObject = null;
            });
    }, [track]);

    return null;
};
