import merge from "lodash.merge";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { store } from "./store/store";
import { sessionDataHandler } from "./sessionDataHandler";
import { initConfig } from "./store/actions/initActions";
import { ConfigState } from "./store/definitions";
import { initLogger } from "./logger";
import { PageRouter } from "./Router";

const defaultConfig: ConfigState = {
    serverUrl: "",
    theme: {
        isLight: true,
        overrides: {
            backgroundColors: {
                colorBackgroundPrimary: "#0F5156",
                colorBackgroundPrimaryWeaker: "rgb(15 81 86 / 0.4)",
                colorBackgroundInverseStrong: "#111a24",
                colorBackgroundPrimaryStronger: "rgb(5 61 66)",
                colorBackgroundNeutralWeakest: "#F4F4F4",
                colorBackgroundBrandHighlightWeakest: "#C4C4C4",
                colorBackgroundSuccessLightest: "#D1FAE0",
                colorBackgroundUnavailable: "#E1E3EA",
            },
            textColors: {
                colorTextBrandHighlight: "#0F5156",
                colorTextWeak: "#121C2D",
                colorTextNeutral: "rgb(75, 86, 113)",
                colorTextInverseWeaker: "#606B85",
                colorTextWarning: "#C4C4C4",
                colorTextWeaker: "#696F8C"
            },
            borderColors: {
                colorBorderPrimary: "#0F5156",
            }
        }
    },
    fileAttachment: {
        enabled: true,
        maxFileSize: 16777216, // 16 MB
        acceptedExtensions: ["jpg", "jpeg", "png", "amr", "mp3", "mp4", "pdf", "txt"]
    }
};

const initWebchat = async (config: ConfigState) => {
    const mergedConfig = merge({}, defaultConfig, config);
    sessionDataHandler.setEndpoint(mergedConfig.serverUrl);
    store.dispatch(initConfig(mergedConfig));
    initLogger();
    const rootElement = document.getElementById("root");

    render(
        <Provider store={store}>
            <PageRouter />
        </Provider>,
        rootElement
    );
};

declare global {
    interface Window {
        Twilio: {
            initWebchat: (config: ConfigState) => void;
        };
    }
}

// Expose `initWebchat` function to window object
Object.assign(window, {
    Twilio: {
        initWebchat
    }
});
