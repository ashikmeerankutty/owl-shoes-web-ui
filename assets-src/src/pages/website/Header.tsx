/* eslint-disable react/jsx-max-depth */
import { Box, Column, Grid, Text } from "@twilio-paste/core";
import { FC } from "react";
import { ChevronRightIcon } from "@twilio-paste/icons/esm/ChevronRightIcon";

import { ContactInfo } from "./ContactInfo";
import { Alerts } from "./components/Alerts";
import LogoFull from "../../assets/logo-full.png";

const navbarItems = [
    {
        name: "Login"
    },
    {
        name: "Locations"
    },
    {
        name: "Open An account"
    },
    {
        name: "About"
    },
    {
        name: "Careers"
    },
    {
        name: "En Español"
    }
];

export const Header: FC = () => {
    return (
        <Box as="section" id="home" marginTop="space150" width="100%">
            <Box zIndex="zIndex80" backgroundColor="colorBackgroundBody" left={0} position="fixed" top="0" width="100%">
                <Box
                    paddingX="space70"
                    paddingY="space40"
                    backgroundColor="colorBackgroundPrimary"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    columnGap="space30"
                    height="76px"
                >
                    <Box display="flex" columnGap="space30">
                        <img height="20px" src={LogoFull} alt="logo" />
                    </Box>
                    <Box display="flex" columnGap="space30">
                        {navbarItems.map(({ name }, index) => (
                            <Box
                                style={{
                                    borderRight: index === navbarItems.length - 1 ? "none" : "1px solid #fff"
                                }}
                                paddingRight="space30"
                                key={name}
                            >
                                <Text cursor="pointer" as="p" color="colorTextBrandInverse">
                                    {name}
                                </Text>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
            <Box position="fixed" width="100%" marginTop="space200">
                <Alerts />
            </Box>
            <Box paddingX="space70" paddingY="space40">
                <Box display="flex" marginY="space100" columnGap="space20">
                    <Text color="colorTextInverseWeaker" as="p">
                        Snowy OWL Branch
                    </Text>
                    <ChevronRightIcon color="colorTextInverseWeaker" decorative={false} title="Description of icon" />
                    <Text color="colorTextInverseWeaker" as="p">
                        Branch Specialists
                    </Text>
                    <ChevronRightIcon color="colorTextInverseWeaker" decorative={false} title="Description of icon" />
                    <Text color="colorTextInverseWeaker" as="p">
                        Michael Davis
                    </Text>
                </Box>
                <Grid gutter="space30" paddingY="space40">
                    <Column span={6}>
                        <Box display="flex" columnGap="space80">
                            <Box
                                borderRadius="borderRadius20"
                                height="250px"
                                width="184px"
                                objectFit="cover"
                                as="img"
                                src=""
                            />
                            <Box
                                paddingY="space30"
                                display="flex"
                                justifyContent="space-between"
                                flexDirection="column"
                                rowGap="space40"
                            >
                                <Box display="flex" flexDirection="column" rowGap="space50">
                                    <Text
                                        marginBottom="space10"
                                        color="colorTextBrandHighlight"
                                        fontWeight="fontWeightBold"
                                        fontSize="fontSize80"
                                        as="h1"
                                    >
                                        Michael Davis
                                    </Text>
                                    <Text
                                        style={{ fontWeight: 300 }}
                                        color="colorTextWeak"
                                        fontSize="fontSize60"
                                        as="p"
                                    >
                                        Credit Solutions Advisor
                                    </Text>
                                    <Text
                                        style={{ fontWeight: 300 }}
                                        color="colorTextWeak"
                                        fontSize="fontSize60"
                                        as="p"
                                    >
                                        NMLS ID: 1127543
                                    </Text>
                                </Box>
                                <Box display="flex" flexDirection="column" rowGap="space50">
                                    <Text
                                        style={{ fontWeight: 300 }}
                                        color="colorTextWeak"
                                        fontSize="fontSize60"
                                        as="p"
                                    >
                                        (912) 782-5639
                                    </Text>
                                    <Text
                                        style={{ fontWeight: 300, borderBottom: "1px solid #000" }}
                                        marginBottom="space10"
                                        color="colorTextWeak"
                                        fontSize="fontSize60"
                                        as="p"
                                    >
                                        23155 Dolorosa St, Woodland Hills, CA 91367
                                    </Text>
                                </Box>
                            </Box>
                        </Box>
                    </Column>
                    <Column span={6}>
                        <ContactInfo />
                    </Column>
                </Grid>
                <Box marginY="space80" paddingTop="space30">
                    <Text fontSize="fontSize60" lineHeight="lineHeight40" style={{ fontWeight: 300 }} as="p">
                        I&apos;m Michael, and I&apos;m dedicated to helping people to build happy and healthy financial
                        futures. As a licensed credit solutions advisor with over 15 years of experience at Cloud City
                        Bank, I&apos;m here to help you match your unique situations with solutions. Call me today if
                        you&apos;re ready to get started or would like more information.
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};
