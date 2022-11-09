import { Box } from "@twilio-paste/core";
import { CustomizationProvider } from "@twilio-paste/core/dist/customization";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { Header } from "./components/Header";
import { AppState } from "../../store/definitions";
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
