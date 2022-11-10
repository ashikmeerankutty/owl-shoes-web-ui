import { Client, Conversation, Participant, Message, User } from "@twilio/conversations";
import { GenericThemeShape } from "@twilio-paste/theme";
import { AlertVariants } from "@twilio-paste/core/alert";

import { FileAttachmentConfig } from "../utils/definitions";

export type ClickableMessage = {
    key: string;
    message: string;
};

type MessageAttributes = {
    clickableMessages: ClickableMessage[];
    isInfoMessage: boolean;
    videoCallSettings: {
        roomName: string;
        token: string;
        clientInitiated: boolean;
    };
};

export type MessageWithAttributes = Message & {
    attributes: MessageAttributes;
};

export enum EngagementPhase {
    MessagingCanvas = "MessagingCanvas",
    Loading = "Loading",
    EndMessage = "EndMessage"
}

export type ChatState = {
    conversationsClient?: Client;
    conversation?: Conversation;
    participants?: Participant[];
    users?: User[];
    messages?: Message[];
    attachedFiles?: File[];
    conversationState?: string;
};

export type PreEngagementData = { name: string; email: string; query: string };

export type SessionState = {
    currentPhase: EngagementPhase;
    expanded: boolean;
    token?: string;
    conversationSid?: string;
    conversationsClient?: Client;
    conversation?: Conversation;
    users?: User[];
    participants?: Participant[];
    messages?: Message[];
    conversationState?: "active" | "inactive" | "closed";
    preEngagementData?: PreEngagementData;
};

export type ConfigState = {
    serverUrl?: string;
    theme?: {
        isLight?: boolean;
        overrides?: Partial<GenericThemeShape>;
    };
    fileAttachment?: FileAttachmentConfig;
};

export type Notification = {
    dismissible: boolean;
    id: string;
    onDismiss?: () => void;
    message: string;
    timeout?: number;
    type: AlertVariants;
};

export type NotificationState = Notification[];

type ContactState = {
    isPhoneModalOpen: boolean;
    isScheduleModalOpen: boolean;
};

export type AlertState = {
    message: string;
    variant: AlertVariants;
};

export type ScheduleState = {
    slot: string;
    dateString: string;
};

export type AppState = {
    chat: ChatState;
    config: ConfigState;
    session: SessionState;
    notifications: NotificationState;
    contactModal: ContactState;
    schedule: ScheduleState;
    alert: AlertState;
};
