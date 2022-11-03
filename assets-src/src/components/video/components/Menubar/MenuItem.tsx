import { Box, Tooltip } from "@twilio-paste/core";
import { FC } from "react";

import { MenuItemType } from "./types";

export const MenuItem: FC<MenuItemType> = ({ onClick, text, icon: Icon, iconColor, iconBackground }) => {
    return (
        <Tooltip text={text}>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                onClick={onClick}
                cursor="pointer"
            >
                <Box
                    padding="space30"
                    backgroundColor={iconBackground}
                    borderRadius="borderRadiusCircle"
                    boxShadow="shadow"
                >
                    {/** @ts-expect-error icon is a valid JSX element */}
                    <Icon color={iconColor} title={text} decorative={false} />
                </Box>
            </Box>
        </Tooltip>
    );
};
