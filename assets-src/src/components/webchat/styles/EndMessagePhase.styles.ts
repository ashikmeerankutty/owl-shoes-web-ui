import { BoxStyleProps } from "@twilio-paste/core";

export const containerStyles: BoxStyleProps = {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
};

export const contentStyles: BoxStyleProps = {
    maxWidth: "60%",
    textAlign: "center"
};

export const buttonsStyles: BoxStyleProps = {
    display: "flex",
    justifyContent: "center",
    columnGap: "space50",
    marginTop: "space40"
};
