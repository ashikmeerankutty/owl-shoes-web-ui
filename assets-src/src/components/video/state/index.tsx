import { createContext, FC, useContext, useState } from "react";
import { TwilioError } from "twilio-video";

import { Status } from "./constants";

interface StateContextType {
    identity: string;
    token?: string;
    status: Status;
    isLoading: boolean;
    error: TwilioError | Error | null;
    setStatus: (status: Status) => void;
    setToken: (token: string) => void;
    setIdentity: (identity: string) => void;
    setError(error: TwilioError | Error | null): void;
}

const StateContext = createContext<StateContextType>(null!);

export const useAppState = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error("useAppState must be used within the AppStateProvider");
    }
    return context;
};

export const AppStateProvider: FC = ({ children }) => {
    const [error, setError] = useState<TwilioError | Error | null>(null);
    const [token, setToken] = useState<string>();
    const [status, setStatus] = useState<Status>(Status.IDLE);
    const [identity, setIdentity] = useState<string>("");

    const state = {
        identity,
        setIdentity,
        error,
        setError,
        token,
        setToken,
        status,
        setStatus,
        isLoading: status !== Status.IDLE
    };

    return <StateContext.Provider value={state}>{children}</StateContext.Provider>;
};
