import { BoxStyleProps } from "@twilio-paste/core/box";
import { TextStyleProps } from "@twilio-paste/core/text";

export const outerContainerStyles: BoxStyleProps = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "space40"
};

export const bubbleAndAvatarContainerStyles: BoxStyleProps = {
    display: "flex",
    alignItems: "flex-end"
};

export const getInnerContainerStyles = (belongToCurrentUser: boolean): BoxStyleProps => ({
    paddingY: "space50",
    paddingLeft: "space40",
    paddingRight: "space40",
    backgroundColor: belongToCurrentUser ? "colorBackground" : "colorBackgroundBrandHighlightWeakest",
    color: "colorText",
    textAlign: belongToCurrentUser ? "right" : "left",
    borderRadius: "borderRadius30",
    marginLeft: belongToCurrentUser ? "auto" : "space0",
    marginRight: belongToCurrentUser ? "space0" : "auto",
    width: "80%"
});

export const timeStampStyles: TextStyleProps = {
    fontSize: "fontSize20",
    color: "inherit"
};

export const bodyStyles: TextStyleProps = {
    color: "inherit",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word"
};

export const readStatusStyles: TextStyleProps = {
    textAlign: "right",
    fontSize: "fontSize10",
    marginRight: "space20",
    color: "colorText"
};

export const clickableMessagesListStyles: BoxStyleProps = {
    marginY: "space30",
    width: "90%"
};

export const clickableMessagesStyles: BoxStyleProps = {
    padding: "space40",
    backgroundColor: "colorBackgroundBrandHighlightWeakest",
    color: "colorText",
    borderRadius: "borderRadius20",
    cursor: "pointer",
    border: "none",
    width: "100%",
    textAlign: "left"
};
