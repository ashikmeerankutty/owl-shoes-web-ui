import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { decodeToken } from "react-jwt";

import { useAnalytics } from "../../common/AnalyticsProvider";

type TrackData = {
    sub: string;
    email: string;
    phone: string;
};

export const usePageTracking = () => {
    const analytics = useAnalytics();
    const { search } = useLocation();

    const identify = useCallback(
        async (params) => {
            return new Promise((resolve, reject) => {
                if (!analytics) {
                    return reject(new Error("Analytics not initialized"));
                }
                return analytics.identify(params, (ctx) => {
                    return resolve(ctx);
                });
            });
        },
        [analytics]
    );

    const track = useCallback(
        async (params) => {
            return new Promise((resolve, reject) => {
                if (!analytics) {
                    return reject(new Error("Analytics not initialized"));
                }
                return analytics.track(params, (ctx) => {
                    return resolve(ctx);
                });
            });
        },
        [analytics]
    );

    const trackDeeplink = async (token: string) => {
        const trackData = decodeToken<TrackData>(token);
        if (!trackData) {
            return;
        }
        const { sub } = trackData;
        try {
            await identify(sub);
            await track("Clicked Promotional Email");
        } catch (e) {}
    };

    useEffect(() => {
        const { token } = Object.fromEntries(new URLSearchParams(search));
        if (token) {
            trackDeeplink(token);
        }
    }, [search]);
};
