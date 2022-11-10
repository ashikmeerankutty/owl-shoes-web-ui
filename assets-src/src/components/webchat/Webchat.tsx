import { Fragment, useCallback, useEffect } from "react";
import { Box } from "@twilio-paste/core/box";
import { useDispatch, useSelector } from "react-redux";

import { MessagingCanvasPhase } from "./MessagingCanvasPhase";
import { AppState, EngagementPhase } from "../../store/definitions";
import { innerContainerStyles, outerContainerStyles } from "./styles/RootContainer.styles";
import { EndMessagePhase } from "./EndMessagePhase";
import { AppStateProvider } from "../video/state";
import { VideoProvider } from "../video/components/VideoProvider/VideoProvider";
import { VideoChatWidget } from "../video/components/VideoChatWidget/VideoChatWidget";
import { LoadingPhase } from "./LoadingPhase";
import { initSession } from "../../store/actions/initActions";
import { sessionDataHandler } from "../../utils/sessionDataHandler";

const getPhaseComponent = (phase: EngagementPhase) => {
    switch (phase) {
        case EngagementPhase.Loading:
            return <LoadingPhase />;
        case EngagementPhase.MessagingCanvas:
            return <MessagingCanvasPhase />;
        case EngagementPhase.EndMessage:
            return <EndMessagePhase />;
        default:
            return <MessagingCanvasPhase />;
    }
};

export const Webchat = () => {
    const dispatch = useDispatch();

    const createNewChatSession = useCallback(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlParams);
        const data = await sessionDataHandler.fetchAndStoreNewSession(params);
        dispatch(initSession({ token: data.token, conversationSid: data.conversationSid }));
    }, [dispatch]);

    useEffect(() => {
        const data = sessionDataHandler.tryResumeExistingSession();
        if (data) {
            try {
                dispatch(initSession({ token: data.token, conversationSid: data.conversationSid }));
            } catch (e) {
                // if initSession fails, create a new chat session - most likely there's something wrong with the store token or conversation sis
                createNewChatSession();
            }
        } else {
            // if no token is stored, create a new chat session
            createNewChatSession();
        }
    }, [dispatch, createNewChatSession]);

    const { currentPhase, expanded } = useSelector(({ session }: AppState) => ({
        currentPhase: session.currentPhase,
        expanded: session.expanded
    }));

    return (
        <Fragment>
            <AppStateProvider>
                <VideoProvider>
                    <Box {...outerContainerStyles}>
                        <VideoChatWidget />
                        {expanded && (
                            <Box data-test="root-container" {...innerContainerStyles}>
                                {getPhaseComponent(currentPhase)}
                            </Box>
                        )}
                    </Box>
                </VideoProvider>
            </AppStateProvider>
        </Fragment>
    );
};
