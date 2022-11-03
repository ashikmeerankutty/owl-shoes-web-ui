import { BoxStyleProps } from "@twilio-paste/core";

export type MenuItemType = {
    text: string;
    onClick: () => void;
    icon: React.ElementType;
    iconColor?: BoxStyleProps["color"];
    iconBackground?: BoxStyleProps["backgroundColor"];
};
