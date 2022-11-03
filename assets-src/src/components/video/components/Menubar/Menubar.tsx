import { Box } from "@twilio-paste/core";
import { FC } from "react";

import { MenuItem } from "./MenuItem";
import { MenuItemType } from "./types";

interface MenuBarProps {
    menuItems: MenuItemType[];
}

export const MenuBar: FC<MenuBarProps> = ({ menuItems }) => {
    return (
        <Box
            style={{
                gridAutoColumns: "minmax(0, 1fr)",
                gridAutoFlow: "column"
            }}
            as="div"
            display="grid"
            justifyContent="center"
            padding="space50"
            columnGap="space50"
            backgroundColor="colorBackgroundBody"
        >
            {menuItems.map((item) => (
                <MenuItem key={item.text} {...item} />
            ))}
        </Box>
    );
};
