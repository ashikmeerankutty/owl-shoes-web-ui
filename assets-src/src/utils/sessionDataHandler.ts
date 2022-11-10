import log from "loglevel";

import { Token } from "./definitions";
import { getAgentId } from "./getAgentId";

const LOCAL_STORAGE_ITEM_ID = "TWILIO_WEBCHAT_WIDGET";

let _endpoint = "";

export async function contactBackend<T>(endpointRoute: string, body: Record<string, unknown> = {}): Promise<T> {
    const response = await fetch(_endpoint + endpointRoute, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error("Request to backend failed");
    }

    return response.json();
}

function getStoredSessionData() {
    const item = localStorage.getItem(LOCAL_STORAGE_ITEM_ID);
    let storedData: Record<string, Token>;

    if (!item) {
        return null;
    }

    try {
        storedData = JSON.parse(item);
    } catch (e) {
        log.log("Couldn't parse locally stored data");
        return null;
    }

    return storedData;
}

function getStoredSessionDataForAgent() {
    const agentId = getAgentId();
    const sessionData = getStoredSessionData();
    if (!sessionData || !sessionData[agentId]) {
        return null;
    }
    return sessionData[agentId];
}

function storeSessionData(data: Token) {
    const currentSessionData = getStoredSessionData();
    let newSessionData = {
        [data.agentId]: { ...data }
    };
    if (currentSessionData) {
        newSessionData = {
            ...currentSessionData,
            ...newSessionData
        };
    }
    localStorage.setItem(LOCAL_STORAGE_ITEM_ID, JSON.stringify(newSessionData));
}

export const sessionDataHandler = {
    setEndpoint(endpoint: string = "") {
        _endpoint = endpoint;
    },

    getEndpoint() {
        return _endpoint;
    },

    tryResumeExistingSession(): Token | null {
        log.debug("sessionDataHandler: trying to refresh existing session");
        const storedTokenData = getStoredSessionDataForAgent();

        if (!storedTokenData) {
            log.debug("sessionDataHandler: no tokens stored, no session to refresh");
            return null;
        }

        if (Date.now() >= new Date(storedTokenData.expiration).getTime()) {
            log.debug("sessionDataHandler: token expired, ignoring existing sessions");
            return null;
        }

        log.debug("sessionDataHandler: existing token still valid, using existing session data");
        return storedTokenData;
    },

    async getUpdatedToken(): Promise<Token> {
        log.debug("sessionDataHandler: trying to get updated token from BE");
        const storedTokenData = getStoredSessionDataForAgent();

        if (!storedTokenData) {
            throw Error("Can't update token: current token doesn't exist");
        }

        let newTokenData: Token;

        try {
            newTokenData = await contactBackend<Token>("/refreshToken", {
                token: storedTokenData.token
            });
        } catch (e) {
            throw Error(`Something went wrong when trying to get an updated token: ${e}`);
        }

        // Server won't return a conversation SID, so we merge the existing data with the latest one
        const updatedSessionData = {
            ...storedTokenData,
            ...newTokenData
        };

        storeSessionData(updatedSessionData);

        return updatedSessionData;
    },

    fetchAndStoreNewSession: async (params?: Record<string, string | undefined>) => {
        log.debug("sessionDataHandler: trying to create new session");
        const agentId = window.location.hash.split("/")?.[1];

        let newTokenData;
        try {
            newTokenData = await contactBackend<Token>("/initWebchat", {
                formData: {
                    ...params,
                    agentId,
                    skillsNeeded: "TV",
                    enquiredDate: "19 - SEP - 2022 10: 25 AM",
                    productImageUrl:
                        "https://m.media-amazon.com/images/I/71eUw15rVbL._SX679_.jpg&productName=Asus 108 cm (43 inches) Crystal 4K Series Ultra HD Smart LED TV UA43AUE60AKLXL (Black)",
                    productSku: "AS89212",
                    timeSpend: "6: 00"
                }
            });
        } catch (e) {
            throw Error("No results from server");
        }

        log.debug("sessionDataHandler: new session successfully created");
        storeSessionData(newTokenData);

        return newTokenData;
    },

    clear: () => {
        localStorage.removeItem(LOCAL_STORAGE_ITEM_ID);
    }
};
