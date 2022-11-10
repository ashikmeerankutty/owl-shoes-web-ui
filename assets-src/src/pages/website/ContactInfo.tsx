import { FC, forwardRef } from "react";
import { ProductMessagingIcon } from "@twilio-paste/icons/esm/ProductMessagingIcon";
import { VideoOnIconProps } from "@twilio-paste/icons/esm/VideoOnIcon";
import { ProductVoiceIcon } from "@twilio-paste/icons/esm/ProductVoiceIcon";
import { Box, Text, Tooltip } from "@twilio-paste/core";
import { useDispatch, useSelector } from "react-redux";

import { changeExpandedStatus, updatePhoneCallModal } from "../../store/actions/genericActions";
import { AppState } from "../../store/definitions";
import { PhoneContactModal } from "./components/PhoneContactModal";

interface ContactCardProps {
    text: string;
    markup: JSX.Element;
    icon: FC<VideoOnIconProps>;
    action?: () => void;
    isDisabled: boolean;
    info?: JSX.Element;
}

const ContactCard: FC<ContactCardProps> = forwardRef(({ action, text, isDisabled, markup, icon: Icon, info }) => {
    return (
        <Box
            as="button"
            onClick={action}
            border="none"
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            rowGap="space10"
            key={text}
            padding="space70"
            backgroundColor="colorBackgroundNeutralWeakest"
            borderRadius="borderRadius30"
            cursor="pointer"
            boxShadow="shadow"
        >
            <Box maxWidth="75px">
                <Text
                    color={isDisabled ? "colorTextWarning" : "colorTextBrandHighlight"}
                    fontWeight="fontWeightSemibold"
                    textAlign="center"
                    fontSize="fontSize40"
                    as="p"
                >
                    {markup}
                </Text>
            </Box>
            <Icon
                size="sizeIcon80"
                color={isDisabled ? "colorTextWarning" : "colorTextBrandHighlight"}
                decorative={false}
                title={text}
            />
            {info}
        </Box>
    );
});

export const ContactInfo = () => {
    const dispatch = useDispatch();
    const expanded = useSelector((state: AppState) => state.session.expanded);

    const onTriggerChat = () => {
        dispatch(changeExpandedStatus({ expanded: !expanded }));
    };

    const contactMethods = [
        {
            text: "Start Chat",
            markup: (
                <span>
                    Start
                    <br />
                    Chat
                </span>
            ),
            icon: ProductMessagingIcon,
            action: onTriggerChat,
            isDisabled: false,
            tooltipText: ""
        },

        {
            text: "Phone Call",
            markup: (
                <span>
                    Phone
                    <br />
                    Call
                </span>
            ),
            icon: ProductVoiceIcon,
            isDisabled: false,
            action: () => dispatch(updatePhoneCallModal(true)),
            info: <PhoneContactModal onDismiss={() => dispatch(updatePhoneCallModal(false))} />
        }
    ];
    return (
        <Box display="flex" columnGap="space60" justifyContent="space-between">
            {contactMethods.map(({ tooltipText, ...props }) =>
                tooltipText ? (
                    <Tooltip placement="top" key={props.text} text={tooltipText}>
                        <Box flexGrow={1}>
                            <ContactCard {...props} />
                        </Box>
                    </Tooltip>
                ) : (
                    <Box key={props.text} flexGrow={1}>
                        <ContactCard key={props.text} {...props} />
                    </Box>
                )
            )}
        </Box>
    );
};
