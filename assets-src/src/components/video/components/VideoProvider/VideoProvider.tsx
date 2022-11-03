import { createContext, ReactNode, useCallback, useContext } from "react";
import { ConnectOptions, Room } from "twilio-video";

import { useRoom } from "../../hooks/useRoom";

interface VideoContextProps {
    room: Room | null;
    isConnecting: boolean;
    connect: (token: string) => Promise<void>;
    onError: ErrorCallback;
}

const VideoContext = createContext<VideoContextProps>(null!);

export const useVideo = () => {
    const context = useContext(VideoContext);
    if (!context) {
        throw new Error("useVideo must be used within the VideoProvider");
    }
    return context;
};

interface VideoProviderProps {
    options?: ConnectOptions;
    onError?: ErrorCallback;
    children: ReactNode;
}

export const VideoProvider = ({ options, children, onError }: VideoProviderProps) => {
    const onErrorCallback: ErrorCallback = useCallback(
        (error) => {
            if (onError) {
                onError(error);
            }
        },
        [onError]
    );

    const { room, isConnecting, connect } = useRoom(onErrorCallback, options);

    return (
        <VideoContext.Provider
            value={{
                room,
                isConnecting,
                onError: onErrorCallback,
                connect
            }}
        >
            {children}
        </VideoContext.Provider>
    );
};
