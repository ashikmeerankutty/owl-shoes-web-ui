import { Box } from "@twilio-paste/core/box";
import { useSelector } from "react-redux";

import { MessagingCanvasPhase } from "./MessagingCanvasPhase";
import { AppState, EngagementPhase } from "../store/definitions";
import { innerContainerStyles, outerContainerStyles } from "./styles/RootContainer.styles";
import { Website } from "./website/Website";
import { EndMessagePhase } from "./EndMessagePhase";
import { AppStateProvider } from "./video/state";
import { VideoProvider } from "./video/components/VideoProvider/VideoProvider";
import { VideoChatWidget } from "./video/components/VideoChatWidget/VideoChatWidget";
import { WebsiteProvider } from "./website/WebsiteProvider/WebsiteProvider";
import { LoadingPhase } from "./LoadingPhase";

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

export function RootContainer() {
    const { currentPhase, expanded } = useSelector(({ session }: AppState) => ({
        currentPhase: session.currentPhase,
        expanded: session.expanded
    }));

    return (
        <AppStateProvider>
            <VideoProvider>
                <WebsiteProvider>
                    <Box>
                        <Website />
                        <Box {...outerContainerStyles}>
                            <VideoChatWidget />
                            {expanded && (
                                <Box data-test="root-container" {...innerContainerStyles}>
                                    {getPhaseComponent(currentPhase)}
                                </Box>
                            )}
                        </Box>
                    </Box>
                </WebsiteProvider>
            </VideoProvider>
        </AppStateProvider>
    );
}
