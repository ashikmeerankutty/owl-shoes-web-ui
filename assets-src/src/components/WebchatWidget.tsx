import { useDispatch, useSelector } from "react-redux";
import { CustomizationProvider, CustomizationProviderProps } from "@twilio-paste/core/customization";
import { CSSProperties, FC, useEffect, useCallback } from "react";

import { RootContainer } from "./RootContainer";
import { AppState } from "../store/definitions";
import { sessionDataHandler } from "../sessionDataHandler";
import { initSession } from "../store/actions/initActions";

const AnyCustomizationProvider: FC<CustomizationProviderProps & { style: CSSProperties }> = CustomizationProvider;

export function WebchatWidget() {
    const theme = useSelector((state: AppState) => state.config.theme);
    const dispatch = useDispatch();

    const createNewChatSession = useCallback(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlParams);
        const data = await sessionDataHandler.fetchAndStoreNewSession(params);
        dispatch(initSession({ token: data.token, conversationSid: data.conversationSid }));
    }, [dispatch]);

    useEffect(() => {
        const data = sessionDataHandler.tryResumeExistingSession();
        if (data) {
            try {
                dispatch(initSession({ token: data.token, conversationSid: data.conversationSid }));
            } catch (e) {
                // if initSession fails, create a new chat session - most likely there's something wrong with the store token or conversation sis
                createNewChatSession();
            }
        } else {
            // if no token is stored, create a new chat session
            createNewChatSession();
        }
    }, [dispatch, createNewChatSession]);

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
            <RootContainer />
        </AnyCustomizationProvider>
    );
}
