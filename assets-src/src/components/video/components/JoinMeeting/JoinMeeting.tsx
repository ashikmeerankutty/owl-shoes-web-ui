import { FC, useState } from "react";
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalFooterActions,
    ModalHeader,
    ModalHeading,
    Text
} from "@twilio-paste/core";
import { useSelector } from "react-redux";
import log from "loglevel";
import { useUID } from "@twilio-paste/core/dist/uid-library";

import { AppState } from "../../../../store/definitions";
import { useWebsite } from "../../../website/WebsiteProvider/WebsiteProvider";
import { VideoCallStarting } from "../../../VideoCallStarting";

interface JoinMeetingProps {
    roomName: string;
    token: string;
    clientInitiated: boolean;
}
export const JoinMeeting: FC<JoinMeetingProps> = ({ roomName, token, clientInitiated }) => {
    const { conversation } = useSelector((state: AppState) => ({
        conversation: state.chat.conversation
    }));
    const [startCall, setStartCall] = useState(false);
    const { userData } = useWebsite();

    const sendMessage = async (messageText: string) => {
        if (!conversation) {
            log.error("Failed sending message: no conversation found");
            return;
        }
        let preparedMessage = conversation.prepareMessage();
        preparedMessage = preparedMessage.setBody(messageText).setAttributes({ isInfoMessage: true });
        await preparedMessage.build().send();
    };

    const onReject = async () => {
        sendMessage("Call rejected");
    };

    const modalHeadingID = useUID();

    return (
        <Box>
            {startCall ? (
                <VideoCallStarting
                    roomName={roomName}
                    token={token}
                    clientInitiated={clientInitiated}
                    onDismiss={() => {
                        setStartCall(false);
                        onReject();
                    }}
                    sendMessage={sendMessage}
                />
            ) : (
                <Modal ariaLabelledby={modalHeadingID} isOpen={true} onDismiss={onReject} size="default">
                    <ModalHeader>
                        <ModalHeading as="h3" id={modalHeadingID}>
                            {userData?.Name} has started a video call.
                        </ModalHeading>
                    </ModalHeader>
                    <ModalBody>
                        <Text as="p">Select “Accept” to join meeting.</Text>
                    </ModalBody>
                    <ModalFooter>
                        <ModalFooterActions>
                            <Button variant="secondary" onClick={onReject}>
                                Cancel
                            </Button>
                            <Button onClick={() => setStartCall(true)} variant="primary">
                                Accept
                            </Button>
                        </ModalFooterActions>
                    </ModalFooter>
                </Modal>
            )}
        </Box>
    );
};
