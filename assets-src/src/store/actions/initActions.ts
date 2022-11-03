import { Client, Conversation } from "@twilio/conversations";
import { Dispatch } from "redux";

import { initMessagesListener } from "./listeners/messagesListener";
import { initParticipantsListener } from "./listeners/participantsListener";
import { initConversationListener } from "./listeners/conversationListener";
import { ConfigState, EngagementPhase } from "../definitions";
import { initClientListeners } from "./listeners/clientListener";
import { notifications } from "../../notifications";
import { ACTION_START_SESSION, ACTION_LOAD_CONFIG } from "./actionTypes";
import { addNotification, changeEngagementPhase } from "./genericActions";
import { MESSAGES_LOAD_COUNT } from "../../constants";

export function initConfig(config: ConfigState) {
    return {
        type: ACTION_LOAD_CONFIG,
        payload: config
    };
}

export function initSession({ token, conversationSid }: { token: string; conversationSid: string }) {
    return async (dispatch: Dispatch) => {
        let conversation: Conversation;
        let participants;
        let users;
        let messages;

        const conversationsClient = new Client(token);

        conversationsClient.on("stateChanged", async (state) => {
            if (state === "initialized") {
                try {
                    conversation = await conversationsClient.getConversationBySid(conversationSid);
                    participants = await conversation.getParticipants();
                    users = await Promise.all(participants.map(async (p) => p.getUser()));
                    messages = (await conversation.getMessages(MESSAGES_LOAD_COUNT)).items;
                } catch (e) {
                    dispatch(
                        addNotification(notifications.failedToInitSessionNotification("Couldn't load conversation"))
                    );
                    dispatch(changeEngagementPhase({ phase: EngagementPhase.MessagingCanvas }));
                    return;
                }
                dispatch({
                    type: ACTION_START_SESSION,
                    payload: {
                        token,
                        conversationSid,
                        conversationsClient,
                        conversation,
                        users,
                        participants,
                        messages,
                        conversationState: conversation.state?.current,
                        currentPhase: EngagementPhase.MessagingCanvas
                    }
                });

                initClientListeners(conversationsClient, dispatch);
                initConversationListener(conversation, dispatch);
                initMessagesListener(conversation, dispatch);
                initParticipantsListener(conversation, dispatch);
            }
        });
    };
}
