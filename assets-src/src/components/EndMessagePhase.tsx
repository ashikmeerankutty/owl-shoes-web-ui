import { Box, Button, Text, Separator } from "@twilio-paste/core";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeEngagementPhase } from "../store/actions/genericActions";
import { AppState, EngagementPhase } from "../store/definitions";
import { Header } from "./Header";
import { buttonsStyles, containerStyles, contentStyles } from "./styles/EndMessagePhase.styles";

export const EndMessagePhase = () => {
    const dispatch = useDispatch();
    const { conversation } = useSelector((state: AppState) => ({
        conversation: state.chat.conversation
    }));
    const endConversation = async () => {
        await conversation?._update({
            state: {
                current: "inactive",
                dateUpdates: Date.now()
            }
        });
        dispatch(changeEngagementPhase({ phase: EngagementPhase.MessagingCanvas }));
    };

    const returnToMessage = () => {
        dispatch(changeEngagementPhase({ phase: EngagementPhase.MessagingCanvas }));
    };

    return (
        <Fragment>
            <Header />
            <Separator orientation="horizontal" />
            <Box {...containerStyles}>
                <Box {...contentStyles}>
                    <Text as="p">Are you sure you want to end the chat?</Text>
                    <Box {...buttonsStyles}>
                        <Button onClick={endConversation} variant="primary">
                            Yes
                        </Button>
                        <Button onClick={returnToMessage} variant="secondary">
                            No
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Fragment>
    );
};
