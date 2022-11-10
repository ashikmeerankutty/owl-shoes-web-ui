import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalFooterActions,
    ModalHeader,
    ModalHeading
} from "@twilio-paste/core";
import { useUID } from "@twilio-paste/core/dist/uid-library";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RemoteParticipant } from "twilio-video";

import { AppState } from "../../../../store/definitions";
import { useParticipants } from "../../hooks/useParticipants";
import { Participant } from "../Participant/Participant";
import { useVideo } from "../VideoProvider/VideoProvider";

export const Participants: FC = () => {
    const participants = useParticipants();
    const { room } = useVideo();

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
    const modalHeadingID = useUID();

    const endCall = () => {
        room?.disconnect();
        sendMessage("Your video call has ended.");
    };

    return (
        <Modal
            ariaLabelledby={modalHeadingID}
            isOpen={true}
            onDismiss={() => {
                room?.disconnect();
                sendMessage("Your video call has ended.");
            }}
            size="default"
        >
            <ModalHeader>
                <ModalHeading as="h3" id={modalHeadingID}>
                    Video call with Agent
                </ModalHeading>
            </ModalHeader>
            <ModalBody>
                <Box display="flex" flexDirection="column" rowGap="space50">
                    {room?.localParticipant && <Participant participant={room.localParticipant} />}
                    {participants.map((participant: RemoteParticipant) => {
                        return <Participant key={participant.sid} participant={participant} />;
                    })}
                </Box>
            </ModalBody>
            <ModalFooter>
                <ModalFooterActions>
                    <Button variant="destructive" onClick={endCall}>
                        End Call
                    </Button>
                </ModalFooterActions>
            </ModalFooter>
        </Modal>
    );
};
