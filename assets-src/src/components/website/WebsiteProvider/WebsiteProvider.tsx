import { createContext, FC, useCallback, useContext, useState } from "react";

import { getUserData } from "../api/getUserData";
import { UserData } from "../api/types";

interface WebsiteContextProps {
    userDataLoading: boolean;
    userData: UserData | null;
    fetchAndUpdateUserData: (userId: string) => Promise<void>;
}

const WebsiteContext = createContext<WebsiteContextProps>(null!);

export const useWebsite = () => {
    const context = useContext(WebsiteContext);
    if (!context) {
        throw new Error("useWebsite must be used within the WebsiteProvider");
    }
    return context;
};

export const WebsiteProvider: FC = ({ children }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [userDataLoading, setUserDataLoading] = useState(true);

    const fetchAndUpdateUserData = useCallback(
        async (userId: string) => {
            setUserDataLoading(true);
            try {
                const updatedUserData = await getUserData(userId);
                setUserData(updatedUserData);
            } catch {
                throw new Error("Invalid user");
            } finally {
                setUserDataLoading(false);
            }
        },
        [setUserData]
    );

    return (
        <WebsiteContext.Provider
            value={{
                userDataLoading,
                userData,
                fetchAndUpdateUserData
            }}
        >
            {children}
        </WebsiteContext.Provider>
    );
};
