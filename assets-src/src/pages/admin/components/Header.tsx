import { Box, Text } from "@twilio-paste/core";

export const Header = () => (
    <Box as="section" id="admin-header" width="100%">
        <Box zIndex="zIndex80" left={0} position="fixed" top="0" width="100%">
            <Box
                paddingX="space70"
                paddingY="space40"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                columnGap="space30"
                height="56px"
                boxShadow="shadowBorderLight"
            >
                <Box display="flex" alignItems="center" columnGap="space30">
                    <Text as="h1" className="logo">Owl Shoes</Text>
                    <Text as="p">Admin</Text>
                </Box>
            </Box>
        </Box>
    </Box>
);
