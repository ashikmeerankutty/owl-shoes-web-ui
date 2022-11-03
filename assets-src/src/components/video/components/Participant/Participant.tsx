import { FC } from "react";
import { LocalParticipant, RemoteParticipant } from "twilio-video";

import usePublications from "../../hooks/usePublications";
import { Publication } from "../Publication/Publication";

interface ParticipantProps {
    participant: RemoteParticipant | LocalParticipant;
}

export const Participant: FC<ParticipantProps> = ({ participant }) => {
    const publications = usePublications(participant);

    return (
        <>
            {publications.map((publication) => {
                return <Publication key={publication.kind} publication={publication} />;
            })}
        </>
    );
};
