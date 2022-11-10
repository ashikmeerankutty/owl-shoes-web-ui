import merge from "lodash.merge";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { store } from "./store/store";
import { sessionDataHandler } from "./utils/sessionDataHandler";
import { initConfig } from "./store/actions/initActions";
import { ConfigState } from "./store/definitions";
import { PageRouter } from "./PageRouter";
import { AnalyticsProvider } from "./common/AnalyticsProvider";

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
                colorBackgroundUnavailable: "#E1E3EA"
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
                colorBorderPrimary: "#0F5156"
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
    const rootElement = document.getElementById("root");

    render(
        <Provider store={store}>
            <AnalyticsProvider>
                <PageRouter />
            </AnalyticsProvider>
        </Provider>,
        rootElement
    );
};

initWebchat({ serverUrl: process.env.REACT_APP_SERVER_URL });
