import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";
import { CloseIcon } from "@twilio-paste/icons/esm/CloseIcon";
import { useDispatch, useSelector } from "react-redux";
import log from "loglevel";
import { UserIcon } from "@twilio-paste/icons/esm/UserIcon";
import { ChevronRightIcon } from "@twilio-paste/icons/esm/ChevronRightIcon";

import { closeStyles, containerStyles, infoStyles, titleStyles } from "./styles/Header.styles";
import { changeEngagementPhase, changeExpandedStatus } from "../store/actions/genericActions";
import { AppState, EngagementPhase } from "../store/definitions";
import { VideoIcon } from "./icons/VideoIcon";
import { useWebsite } from "./website/WebsiteProvider/WebsiteProvider";

export const Header = ({ customTitle }: { customTitle?: string }) => {
    const { userData } = useWebsite();
    const dispatch = useDispatch();
    const { conversation } = useSelector((state: AppState) => ({
        conversation: state.chat.conversation
    }));
    const endConversation = () => {
        if (conversation?.state?.current !== "active") {
            dispatch(changeExpandedStatus({ expanded: false }));
            return;
        }
        dispatch(changeEngagementPhase({ phase: EngagementPhase.EndMessage }));
    };

    const sendVideoCallInvite = async () => {
        if (!conversation) {
            log.error("Failed sending invite no conversation found");
            return;
        }
        let preparedMessage = conversation.prepareMessage();
        preparedMessage = preparedMessage
            .setBody(`Call started, Waiting for ${userData?.Name} to accept call.`)
            .setAttributes({
                videoCallSettings: {
                    init: true
                },
                isInfoMessage: true
            });
        await preparedMessage.build().send();
    };

    return (
        <Box as="header" {...containerStyles}>
            <Box {...infoStyles}>
                <Box borderRadius="borderRadiusCircle" backgroundColor="colorBackgroundBrand" padding="space20">
                    <UserIcon color="colorTextBrandInverse" size="sizeIcon10" decorative={false} title="User icon" />
                </Box>
                <Box display="flex">
                    <Text as="h2" {...titleStyles}>
                        {customTitle || `Chat with us`}
                    </Text>
                    <ChevronRightIcon decorative={false} title="Right icon" />
                </Box>
            </Box>
            <Box display="flex" columnGap="space20">
                <Box as="button" {...closeStyles} onClick={endConversation}>
                    <CloseIcon color="colorTextWeaker" decorative={false} title="Close" />
                </Box>
            </Box>
        </Box>
    );
};
