import { useState, Fragment } from "react";
import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";
import { Button } from "@twilio-paste/core/button";
import { useDispatch } from "react-redux";

import { sessionDataHandler } from "../sessionDataHandler";
import { changeEngagementPhase } from "../store/actions/genericActions";
import { EngagementPhase } from "../store/definitions";
import { containerStyles, textStyles, titleStyles } from "./styles/ConversationEnded.styles";
import { initSession } from "../store/actions/initActions";
import { Survey } from "./Survey";

export const ConversationEnded = () => {
    const dispatch = useDispatch();
    const [surveyShown, setSurveyValue] = useState(false);

    const handleClick = async () => {
        sessionDataHandler.clear();
        dispatch(changeEngagementPhase({ phase: EngagementPhase.Loading }));
        const data = await sessionDataHandler.fetchAndStoreNewSession();
        dispatch(initSession({ token: data.token, conversationSid: data.conversationSid }));
    };

    return (
        <Box {...containerStyles}>
            <Text as="h1" {...titleStyles}>
                Thanks for chatting with us!
            </Text>

            {surveyShown ? (
                <Text as="p" {...titleStyles}>
                    Thanks for your rating !
                </Text>
            ) : (
                <Fragment>
                    <Text as="p" {...titleStyles}>
                        Please share your rating !
                    </Text>
                    <Survey setSurveyValue={setSurveyValue} />
                </Fragment>
            )}

            <Text as="p" {...textStyles}>
                If you have any more questions, feel free to reach out again.
            </Text>

            <Button variant="primary" data-test="start-new-chat-button" onClick={handleClick}>
                Start new chat
            </Button>
        </Box>
    );
};
