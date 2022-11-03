import { Box, Text } from "@twilio-paste/core";
import { FC } from "react";

interface InfoMessageProps {
    messageBody: string;
}

export const InfoMessage: FC<InfoMessageProps> = ({ messageBody }) => {
    return (
        <Box marginBottom="space30" textAlign="center">
            <Text as="p" fontSize="fontSize20">
                {messageBody}
            </Text>
        </Box>
    );
};
