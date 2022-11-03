import {
    Modal,
    ModalHeader,
    ModalHeading,
    ModalBody,
    ModalFooter,
    ModalFooterActions,
    Button,
    Text,
    Box,
    Anchor
} from "@twilio-paste/core";
import log from "loglevel";
import { useUID } from "@twilio-paste/core/dist/uid-library";
import { FC, useEffect, useRef } from "react";

import { useVideo } from "./video/components/VideoProvider/VideoProvider";
import { useAppState } from "./video/state";
import { useWebsite } from "./website/WebsiteProvider/WebsiteProvider";

interface VideoCallStartingProps {
    roomName: string;
    token: string;
    onDismiss: () => void;
    sendMessage: (message: string) => Promise<void>;
    clientInitiated: boolean;
}

export const VideoCallStarting: FC<VideoCallStartingProps> = ({
    roomName,
    token,
    onDismiss,
    sendMessage,
    clientInitiated
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { setToken } = useAppState();
    const { userData } = useWebsite();

    const { connect: connectVideo, isConnecting } = useVideo();

    const handleJoin = async () => {
        console.log(roomName, token);
        if (!roomName || !token) {
            return;
        }
        setToken(token);
        await connectVideo(token);
        sendMessage(`${userData?.Name} is starting the video call.`);
    };

    useEffect(() => {
        if (clientInitiated) {
            handleJoin();
        }
    }, [clientInitiated]);

    const getVideo = () => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((newStream) => {
                const video = videoRef.current;
                if (!video) {
                    return;
                }
                video.srcObject = newStream;
                video.play();
            })
            .catch((err) => {
                log.error("error:", err);
            });
    };

    useEffect(() => {
        getVideo();
    }, []);

    const modalHeadingID = useUID();

    return (
        <Modal onDismiss={onDismiss} ariaLabelledby={modalHeadingID} isOpen={true} size="default">
            <ModalHeader>
                <ModalHeading as="h3" id={modalHeadingID}>
                    Starting a video call
                </ModalHeading>
            </ModalHeader>
            <ModalBody>
                <Text as="p" marginBottom="space50">
                    Please give your browser permission to access your camera and microphone.
                </Text>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Box id="preview__video" height="250px" as="video" maxWidth="100%" ref={videoRef} />
                </Box>
            </ModalBody>
            <ModalFooter>
                <ModalFooterActions>
                    <Text as="p">
                        By clicking “Start” you agree to the <Anchor href="#">Terms and Conditions.</Anchor>
                    </Text>
                    <Button loading={isConnecting} onClick={handleJoin} variant="primary">
                        Start
                    </Button>
                </ModalFooterActions>
            </ModalFooter>
        </Modal>
    );
};
