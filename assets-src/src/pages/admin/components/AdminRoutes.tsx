import { Box, Text } from "@twilio-paste/core";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { SendIcon } from "@twilio-paste/icons/esm/SendIcon";
import { EditIcon } from "@twilio-paste/icons/esm/EditIcon";

type SidebarRoute = {
    path: string;
    name: string;
    icon: ReactElement;
};

const sidebarRoutes: SidebarRoute[] = [
    {
        path: "/admin/invite",
        name: "Invite",
        icon: <SendIcon decorative />
    },
    {
        path: "/admin/purchase",
        name: "Purchases",
        icon: <EditIcon decorative />
    }
];

export const AdminRoutes = () => {
    return (
        <Box id="admin-sidebar" width="10%" position="fixed" top={0} left={0}>
            <Box marginTop="space100" display="flex" flexDirection="column" alignItems="center" rowGap="space100">
                {sidebarRoutes.map(({ path, name, icon }) => (
                    <Link className="route" key={path} to={path}>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="center"
                            key={name}
                        >
                            {icon}
                            <Text as="p">{name}</Text>
                        </Box>
                    </Link>
                ))}
            </Box>
        </Box>
    );
};
