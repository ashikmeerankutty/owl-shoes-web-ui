import { Box } from "@twilio-paste/core/box";
import { ChatIcon } from "@twilio-paste/icons/esm/ChatIcon";
import { ChevronDownIcon } from "@twilio-paste/icons/esm/ChevronDownIcon";
import { useDispatch, useSelector } from "react-redux";

import { changeExpandedStatus } from "../../store/actions/genericActions";
import { AppState } from "../../store/definitions";
import { containerStyles } from "./styles/EntryPoint.styles";

export const EntryPoint = () => {
    const dispatch = useDispatch();
    const expanded = useSelector((state: AppState) => state.session.expanded);

    const onTriggerChat = () => {
        dispatch(changeExpandedStatus({ expanded: !expanded }));
    };

    return (
        <Box
            as="button"
            data-test="entry-point-button"
            onClick={onTriggerChat}
            {...containerStyles}
            backgroundColor="colorBackgroundPrimary"
            _hover={{
                backgroundColor: "colorBackgroundPrimaryStronger"
            }}
        >
            {expanded ? (
                <ChevronDownIcon decorative={false} title="Minimize chat" size="sizeIcon80" />
            ) : (
                <ChatIcon decorative={false} title="Open chat" size="sizeIcon60" />
            )}
        </Box>
    );
};
