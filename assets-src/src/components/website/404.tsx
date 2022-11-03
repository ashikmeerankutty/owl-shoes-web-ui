import { Box, Text } from "@twilio-paste/core";
import { FC } from "react";

export const NotFound: FC = () => (
    <Box
        width="100%"
        height="100vh"
        zIndex="zIndex90"
        position="fixed"
        top="0"
        left="0"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        backgroundColor="colorBackgroundBody"
    >
        <Text as="h1">404 Not Found!</Text>
        <Text display="block" style={{ fontWeight: 300 }} as="p">
            The agent you are looking for is isn&apos;t here.
        </Text>
    </Box>
);
