import { Box } from "@twilio-paste/core";
import { FC } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

import { WebchatWidget } from "./components/WebchatWidget";
import { NotFound } from "./components/website/404";
import { AdminPage } from "./pages/admin/AdminPage";
import { InviteUser } from "./pages/admin/components/InviteUser";

export const PageRouter: FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/:userId" element={<WebchatWidget />} />
                <Route path="/404/" element={<NotFound />} />
                <Route path="/" element={<WebchatWidget />} />
                <Route path="/admin" element={<AdminPage />}>
                    <Route path="invite" element={<InviteUser />} />
                    <Route path="purchase" element={<Box>Purchase Page</Box>} />
                </Route>
            </Routes>
        </HashRouter>
    );
};
