import { Box, Column, Grid, Text } from "@twilio-paste/core";
import { FC } from "react";

import card1 from "../../assets/card-1.jpeg";
import card2 from "../../assets/card-2.jpeg";
import card3 from "../../assets/card-3.jpeg";

const cards = [
    {
        text: "5 tips for buying a home in today's hot seller's market",
        image: card1
    },
    {
        text: "Open houses — What to look for when shopping for a new home",
        image: card2
    },
    {
        text: "What do deed restrictions mean when you're searching for a new home?",
        image: card3
    }
];

export const WhatsNew: FC = () => {
    return (
        <Box as="section" id="whats-new" paddingX="space70" paddingY="space200" paddingBottom="space200">
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Text style={{ fontWeight: 300 }} fontSize="fontSize110" textAlign="center" as="h3">
                    Find out what&apos;s new
                </Text>
                <Box maxWidth="600px">
                    <Text
                        style={{ fontWeight: 300 }}
                        lineHeight="lineHeight50"
                        textAlign="center"
                        fontSize="fontSize60"
                        marginY="space80"
                        as="p"
                    >
                        HomeOutlook® is our monthly newsletter of tips and advice to help with home buying and
                        homeownership.
                    </Text>
                </Box>
            </Box>
            <Box width="100%">
                <Grid>
                    {cards.map(({ text, image }) => (
                        <Column key={text}>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Box
                                    paddingX="space100"
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Box height="214px">
                                        <Box width="100%" height="100%" objectFit="cover" as="img" src={image} />
                                    </Box>
                                    <Text
                                        marginTop="space50"
                                        as="a"
                                        fontSize="fontSize60"
                                        cursor="pointer"
                                        _hover={{ textDecoration: "underline" }}
                                        style={{ fontWeight: 300 }}
                                        color="colorTextBrandHighlight"
                                        textAlign="center"
                                    >
                                        {text}
                                    </Text>
                                </Box>
                            </Box>
                        </Column>
                    ))}
                </Grid>
            </Box>
            <Box display="flex" marginTop="space150" justifyContent="center" alignItems="center">
                <Box
                    as="button"
                    backgroundColor="colorBackgroundPrimary"
                    border="none"
                    color="colorTextBrandInverse"
                    paddingX="space50"
                    paddingY="space40"
                    fontSize="fontSize60"
                    cursor="pointer"
                    _hover={{
                        backgroundColor: "colorBackgroundPrimaryStronger"
                    }}
                >
                    Explore more articles
                </Box>
            </Box>
        </Box>
    );
};
