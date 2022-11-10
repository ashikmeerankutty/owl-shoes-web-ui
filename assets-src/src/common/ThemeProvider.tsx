import { CSSProperties, FC } from "react";
import { CustomizationProvider, CustomizationProviderProps } from "@twilio-paste/core/dist/customization";
import { useSelector } from "react-redux";

import { AppState } from "../store/definitions";

const AnyCustomizationProvider: FC<CustomizationProviderProps & { style: CSSProperties }> = CustomizationProvider;

export const ThemeProvider: FC = ({ children }) => {
    const theme = useSelector((state: AppState) => state.config.theme);

    return (
        <AnyCustomizationProvider
            baseTheme={theme?.isLight ? "default" : "dark"}
            theme={theme?.overrides}
            elements={{
                MESSAGE_INPUT: {
                    boxShadow: "none!important" as "none"
                },
                MESSAGE_INPUT_BOX: {
                    display: "inline-block",
                    boxShadow: "none"
                },
                ALERT: {
                    paddingTop: "space30",
                    paddingBottom: "space30"
                },
                BUTTON: {
                    "&[aria-disabled='true'][color='colorTextLink']": {
                        color: "colorTextLinkWeak"
                    },
                    variants: {
                        primary: {
                            boxShadow: "none",
                            fontWeight: "fontWeightLight",
                            ":hover": {
                                boxShadow: "none"
                            }
                        },
                        secondary: {
                            borderColor: "colorBorderPrimary",
                            borderWidth: "borderWidth10",
                            borderStyle: "solid",
                            color: "colorTextBrandHighlight",
                            boxShadow: "none",
                            ":hover": {
                                boxShadow: "none",
                                color: "colorTextBrandHighlight",
                                backgroundColor: "colorBackgroundPrimaryWeaker"
                            }
                        }
                    }
                }
            }}
            style={{ minHeight: "100%", minWidth: "100%" }}
        >
            {children}
        </AnyCustomizationProvider>
    );
};
