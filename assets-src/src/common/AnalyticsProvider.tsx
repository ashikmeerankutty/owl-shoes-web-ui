import { AnalyticsBrowser } from "@segment/analytics-next";
import { createContext, useContext, useMemo } from "react";

const AnalyticsContext = createContext<AnalyticsBrowser>(undefined!);
const writeKey = process.env.REACT_APP_SEGMENT_WRITE_KEY || "";

type Props = {
    children: React.ReactNode;
};
export const AnalyticsProvider = ({ children }: Props) => {
    const analytics = useMemo(() => AnalyticsBrowser.load({ writeKey }), []);
    return <AnalyticsContext.Provider value={analytics}>{children}</AnalyticsContext.Provider>;
};

// Create an analytics hook that we can use with other components.
export const useAnalytics = () => {
    const result = useContext(AnalyticsContext);
    if (!result) {
        throw new Error("Context used outside of Analytics Provider!");
    }
    return result;
};
