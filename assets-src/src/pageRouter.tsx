import { FC } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

import { WebchatWidget } from "./components/WebchatWidget";
import { NotFound } from "./components/website/404";

export const PageRouter: FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/:userId" element={<WebchatWidget />} />
                <Route path="/404/" element={<NotFound />} />
                <Route path="/" element={<WebchatWidget />} />
            </Routes>
        </HashRouter>
    );
};
