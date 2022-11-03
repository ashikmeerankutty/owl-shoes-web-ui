import log from "loglevel";
import { Media, Message } from "@twilio/conversations";
import { Box } from "@twilio-paste/core/box";
import { ScreenReaderOnly, Stack } from "@twilio-paste/core";
import { useSelector } from "react-redux";
import { Text } from "@twilio-paste/core/text";
import { Flex } from "@twilio-paste/core/flex";
import { Key, KeyboardEvent, useEffect, useRef, useState } from "react";
import { SuccessIcon } from "@twilio-paste/icons/esm/SuccessIcon";

import { AppState, ClickableMessage, MessageWithAttributes } from "../store/definitions";
import { FilePreview } from "./FilePreview";
import { parseMessageBody } from "../utils/parseMessageBody";
import {
    getInnerContainerStyles,
    timeStampStyles,
    bodyStyles,
    outerContainerStyles,
    readStatusStyles,
    bubbleAndAvatarContainerStyles,
    clickableMessagesStyles,
    clickableMessagesListStyles
} from "./styles/MessageBubble.styles";
import { JoinMeeting } from "./video/components/JoinMeeting/JoinMeeting";
import { SentIcon } from "./icons/SentIcon";
import { InfoMessage } from "./InfoMessage";
import { useRoomState } from "./video/hooks/useRoomState";

const doubleDigit = (number: number) => `${number < 10 ? 0 : ""}${number}`;

export const MessageBubble = ({
    message,
    isLast,
    focusable,
    updateFocus
}: {
    message: Message;
    isLast: boolean;
    isLastOfUserGroup: boolean;
    focusable: boolean;
    updateFocus: (newFocus: number) => void;
}) => {
    const [read, setRead] = useState(false);
    const roomState = useRoomState();
    const [isMouseDown, setIsMouseDown] = useState(false);
    const { conversationsClient, participants, users, fileAttachmentConfig, conversation } = useSelector(
        (state: AppState) => ({
            conversationsClient: state.chat.conversationsClient,
            conversation: state.chat.conversation,
            participants: state.chat.participants,
            users: state.chat.users,
            fileAttachmentConfig: state.config.fileAttachment
        })
    );
    const messageRef = useRef<HTMLDivElement>(null);

    const belongsToCurrentUser = message.author === conversationsClient?.user.identity;

    useEffect(() => {
        if (isLast && participants && belongsToCurrentUser) {
            const getOtherParticipants = participants.filter((p) => p.identity !== conversationsClient?.user.identity);
            setRead(
                Boolean(getOtherParticipants.length) &&
                    getOtherParticipants.every((p) => p.lastReadMessageIndex === message.index)
            );
        } else {
            setRead(false);
        }
    }, [participants, isLast, belongsToCurrentUser, conversationsClient, message]);

    useEffect(() => {
        if (focusable) {
            messageRef.current?.focus();
        }
    }, [focusable]);

    const renderMedia = () => {
        if (fileAttachmentConfig?.enabled) {
            if (!message.attachedMedia) {
                return null;
            }

            return message.attachedMedia.map((media: Media, index: Key) => {
                const file = {
                    name: media.filename,
                    type: media.contentType,
                    size: media.size
                } as File;
                return <FilePreview key={index} file={file} isBubble={true} media={media} focusable={focusable} />;
            });
        }

        return <i>Media messages are not supported</i>;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            const newFocusValue = message.index + (e.key === "ArrowUp" ? -1 : 1);
            updateFocus(newFocusValue);
        }
    };

    const handleMouseDown = () => {
        setIsMouseDown(true);
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const handleFocus = () => {
        // Ignore focus from clicks
        if (!isMouseDown) {
            // Necessary since screen readers can set the focus to any focusable element
            updateFocus(message.index);
        }
    };

    // const author = users?.find((u) => u.identity === message.author)?.friendlyName || message.author;

    const { clickableMessages, videoCallSettings, isInfoMessage } = (message as MessageWithAttributes).attributes || {};

    const sendClickableMessage = async (clickableMessage: ClickableMessage): Promise<void> => {
        if (!conversation) {
            log.error("Failed sending message: no conversation found");
            return;
        }

        let preparedMessage = conversation.prepareMessage();
        preparedMessage = preparedMessage.setBody(clickableMessage.message);
        await preparedMessage.build().send();
    };

    const renderClickableMessages = isLast && clickableMessages && !belongsToCurrentUser && (
        <Box {...clickableMessagesListStyles}>
            <Stack orientation="vertical" spacing="space20">
                {clickableMessages.map((clickableMessage: ClickableMessage) => (
                    <Box
                        as="button"
                        tabIndex={focusable ? 0 : -1}
                        {...clickableMessagesStyles}
                        onClick={async (): Promise<void> => sendClickableMessage(clickableMessage)}
                        key={clickableMessage.key}
                    >
                        {clickableMessage.message}
                    </Box>
                ))}
            </Stack>
        </Box>
    );

    const renderVideoCall = isLast && videoCallSettings && !belongsToCurrentUser && roomState !== "connected" && (
        <JoinMeeting {...videoCallSettings} />
    );

    if (isInfoMessage) {
        return (
            <>
                <InfoMessage messageBody={message.body} />
                {renderVideoCall}
            </>
        );
    }

    return (
        <Box
            {...outerContainerStyles}
            tabIndex={focusable ? 0 : -1}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            ref={messageRef}
            data-message-bubble
            data-testid="message-bubble"
        >
            <Box {...bubbleAndAvatarContainerStyles}>
                <Box {...getInnerContainerStyles(belongsToCurrentUser)}>
                    <Text as="p" {...bodyStyles}>
                        {message.body ? parseMessageBody(message.body, belongsToCurrentUser) : null}
                    </Text>
                    {message.type === "media" ? renderMedia() : null}
                    <Flex
                        hAlignContent={belongsToCurrentUser ? "right" : "left"}
                        width="100%"
                        vAlignContent="center"
                        marginBottom="space20"
                    >
                        <ScreenReaderOnly as="p">
                            {belongsToCurrentUser
                                ? "You sent at"
                                : `${users?.find((u) => u.identity === message.author)?.friendlyName} sent at`}
                        </ScreenReaderOnly>
                        {belongsToCurrentUser && <SentIcon marginRight="space10" width="10px" height="10px" />}
                        <Text {...timeStampStyles} as="p">
                            {`${doubleDigit(message.dateCreated.getHours())}:${doubleDigit(
                                message.dateCreated.getMinutes()
                            )}`}
                        </Text>
                    </Flex>
                </Box>
            </Box>
            {/** render clickable messages only if the message is the last message */}
            {renderClickableMessages}
            {renderVideoCall}
            {read && (
                <Flex hAlignContent="right" vAlignContent="center" marginTop="space20">
                    <Text as="p" {...readStatusStyles}>
                        Read
                    </Text>
                    <SuccessIcon decorative={true} size="sizeIcon10" color="colorTextWeak" />
                </Flex>
            )}
        </Box>
    );
};
