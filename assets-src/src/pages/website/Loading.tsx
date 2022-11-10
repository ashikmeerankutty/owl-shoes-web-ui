import { Box } from "@twilio-paste/core";
import { FC } from "react";

export const Loading: FC = () => (
    <Box
        width="100%"
        height="100vh"
        zIndex="zIndex90"
        position="fixed"
        top="0"
        left="0"
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor="colorBackgroundBody"
    >
        <Box className="loading-spinner" />
    </Box>
);
