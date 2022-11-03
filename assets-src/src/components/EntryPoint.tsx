import { Tooltip } from "@twilio-paste/core";
import { Box } from "@twilio-paste/core/box";
import { ChatIcon } from "@twilio-paste/icons/esm/ChatIcon";
import { ChevronDownIcon } from "@twilio-paste/icons/esm/ChevronDownIcon";
import { useDispatch, useSelector } from "react-redux";

import { changeExpandedStatus } from "../store/actions/genericActions";
import { AppState } from "../store/definitions";
import { useAgentPresenceSocket } from "./hooks/useAgentPresenceSocket";
import { containerStyles } from "./styles/EntryPoint.styles";

export const EntryPoint = () => {
    const dispatch = useDispatch();
    const { isAgentAvailable } = useAgentPresenceSocket();
    const expanded = useSelector((state: AppState) => state.session.expanded);

    const onTriggerChat = () => {
        if (isAgentAvailable) {
            dispatch(changeExpandedStatus({ expanded: !expanded }));
        }
    };

    const entryElement = (
        <Box
            as="button"
            data-test="entry-point-button"
            onClick={onTriggerChat}
            {...containerStyles}
            backgroundColor={isAgentAvailable ? "colorBackgroundPrimary" : "colorBackgroundOffline"}
            _hover={{
                backgroundColor: isAgentAvailable ? "colorBackgroundPrimaryStronger" : "colorBackgroundOffline"
            }}
        >
            {expanded ? (
                <ChevronDownIcon decorative={false} title="Minimize chat" size="sizeIcon80" />
            ) : (
                <ChatIcon decorative={false} title="Open chat" size="sizeIcon60" />
            )}
        </Box>
    );

    return isAgentAvailable ? (
        entryElement
    ) : (
        <Tooltip placement="top" text="Agent unavailable">
            {entryElement}
        </Tooltip>
    );
};
