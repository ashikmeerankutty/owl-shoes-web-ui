import { Box, Input, Label, Text } from "@twilio-paste/core";

export const ScheduleMeetingContact = () => {
    return (
        <Box>
            <Text as="p">Please enter the best phone number and e-mail address to reach you at.</Text>
            <Box marginTop="space50">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                    aria-describedby="phone"
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="(832) 789 2849"
                    required
                />
            </Box>
            <Box marginTop="space50">
                <Label htmlFor="email">E-mail address</Label>
                <Input
                    aria-describedby="email"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="macosta@gmail.com"
                    required
                />
            </Box>
        </Box>
    );
};
