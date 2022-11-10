import { BoxStyleProps } from "@twilio-paste/core/box";
import { TextStyleProps } from "@twilio-paste/core/text";

export const containerStyles: BoxStyleProps = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingX: "space50",
    paddingY: "space40",
    borderTopLeftRadius: "borderRadius20",
    borderTopRightRadius: "borderRadius20"
};

export const titleStyles: TextStyleProps = {
    fontSize: "fontSize20"
};

export const infoStyles: BoxStyleProps = {
    display: "flex",
    alignItems: "center",
    columnGap: "space30"
};

export const closeStyles: BoxStyleProps = {
    border: "none",
    cursor: "pointer",
    borderRadius: "borderRadiusCircle",
    backgroundColor: "transparent",
    padding: "space10"
};
