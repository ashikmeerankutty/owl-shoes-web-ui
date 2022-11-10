import { Box } from "@twilio-paste/core";
import { CustomizationProvider } from "@twilio-paste/core/dist/customization";
import { Outlet } from "react-router-dom";

import { Header } from "./components/Header";
import { AdminRoutes } from "./components/AdminRoutes";
import "./AdminPage.css";

export const AdminPage = () => {
    return (
        <CustomizationProvider>
            <Box overflow="hidden">
                <Header />
                <AdminRoutes />
                <Box id="admin-main">
                    <Outlet />
                </Box>
            </Box>
        </CustomizationProvider>
    );
};
