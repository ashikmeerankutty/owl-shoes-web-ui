import { Box } from "@twilio-paste/core";
import { FC } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

import { NotFound } from "./pages/website/404";
import { AdminPage } from "./pages/admin/AdminPage";
import { InviteUser } from "./pages/admin/components/InviteUser";
import { ThemeProvider } from "./common/ThemeProvider";
import { Website } from "./pages/website/Website";

export const PageRouter: FC = () => {
    return (
        <ThemeProvider>
            <HashRouter>
                <Routes>
                    <Route path="/404/" element={<NotFound />} />
                    <Route path="/" element={<Website />} />
                    <Route path="/admin" element={<AdminPage />}>
                        <Route path="invite" element={<InviteUser />} />
                        <Route path="purchase" element={<Box>Purchase Page</Box>} />
                    </Route>
                </Routes>
            </HashRouter>
        </ThemeProvider>
    );
};
