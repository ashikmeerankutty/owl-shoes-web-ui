import { Box, Button, Input, Label, Text } from "@twilio-paste/core";

export const InviteUser = () => {
    return (
        <Box display="flex" flexDirection="column" minWidth={300}>
            <Text textAlign="center" fontSize="fontSize60" as="p">Send Promotional Email</Text>
            <Box marginTop="space70">
                <Label htmlFor="email_address" required>
                    Email address
                </Label>
                <Input
                    aria-describedby="email_help_text"
                    id="email_address"
                    name="email_address"
                    type="email"
                    placeholder="example@twilio.com"
                    required
                />
            </Box>
            <Box marginTop="space60">
                <Label htmlFor="phone_number" required>
                    Phone number
                </Label>
                <Input
                    aria-describedby="email_help_text"
                    id="phone_number"
                    name="phone_number"
                    type="number"
                    placeholder="+919123456789"
                    required
                />
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center"  marginTop="space60">
                <Button variant="secondary">Send</Button>
            </Box>
        </Box>
    );
};
