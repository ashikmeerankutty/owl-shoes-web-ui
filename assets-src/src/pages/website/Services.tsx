import { Box, Column, Grid, Text } from "@twilio-paste/core";
import { FC } from "react";

import ServiceBg from "../../assets/graphic-resources.svg";

const services = [
    {
        name: "Homebuyer Insights",
        cta: "Learn more",
        description: "Discover recent trends in homebuyer attitudes, behaviors and preferences."
    },
    {
        name: "Better Money Habits®",
        cta: "Explore",
        description: "Build your financial knowledge with educational videos and articles on common home loan topics."
    },
    {
        name: "Real Estate Center®",
        cta: "Search now",
        description: "Find your future home by city and state or ZIP code."
    },
    {
        name: "Down Payment Resources",
        cta: "Learn more",
        description: "Search for down payment help in your area."
    }
];

export const Services: FC = () => {
    return (
        <Box as="section" id="services" paddingX="space70" paddingY="space150">
            <Grid>
                <Column>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Box width="100%" paddingTop="space100">
                            <Text textAlign="left" as="h1" fontWeight="fontWeightNormal" fontSize="fontSize110">
                                I&apos;m here for you
                            </Text>
                        </Box>
                        <Box marginTop="space100" marginBottom="space40">
                            <Text as="p" style={{ fontWeight: 300 }} lineHeight="lineHeight40" fontSize="fontSize60">
                                As a Snowy Owl Bank Lending Specialist, I want to make sure that we find the right home
                                loan for you.
                            </Text>
                        </Box>
                        <Box marginTop="space30">
                            <Text as="p" style={{ fontWeight: 300 }} lineHeight="lineHeight40" fontSize="fontSize60">
                                These resources can help you learn about each step of the home loan process, whether
                                you&apos;re looking for a home, hoping to refinance or interested in accessing your
                                home&apos;s equity. If you have any questions, feel free to reach out to me at any time.
                            </Text>
                        </Box>
                    </Box>
                </Column>
                <Column>
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Box as="img" src={ServiceBg} />
                    </Box>
                </Column>
            </Grid>
            <Box marginTop="space150">
                <Grid>
                    {services.map(({ name, cta }) => (
                        <Column key={name}>
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    maxWidth="200px"
                                >
                                    <Text
                                        style={{ fontWeight: 300 }}
                                        lineHeight="lineHeight50"
                                        textAlign="center"
                                        fontSize="fontSize80"
                                        as="h4"
                                    >
                                        {name}
                                    </Text>
                                    <Text
                                        marginTop="space50"
                                        as="a"
                                        fontSize="fontSize60"
                                        cursor="pointer"
                                        _hover={{ textDecoration: "underline" }}
                                        style={{ fontWeight: 300 }}
                                        color="colorTextBrandHighlight"
                                    >
                                        {cta}
                                    </Text>
                                </Box>
                            </Box>
                        </Column>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};
