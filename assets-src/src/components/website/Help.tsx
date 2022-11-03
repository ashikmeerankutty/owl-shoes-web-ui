import { Anchor, Box, Column, Grid, Text } from "@twilio-paste/core";
import { FC } from "react";

import helpLoan from "../../assets/graphic-benefits-hln.svg";
import helpMobile from "../../assets/graphic-benefits-banking.svg";
import helpEdu from "../../assets/777.png";
import backgroundImage from "../../assets/bg-benefits-apples.jpeg";

const helps = [
    {
        image: helpLoan,
        displayText: "Home Loan Navigator®",
        description:
            "When you apply for a home loan with me, the Bank of America Home Loan Navigator can help you track your loan status and more.",
        cta: "Learn more"
    },
    {
        image: helpEdu,
        displayText: "First-Time Homebuyer Online Edu-Series",
        description:
            "Get tips, tools and more from Bank of America specialists as they chat with Buzzfeed's Hannah Williams.",
        cta: "Watch videos"
    },
    {
        image: helpMobile,
        displayText: "Online and Mobile BankingFootnote",
        description:
            "It's easy to manage your Bank of America home loan account with secure access from your laptop, tablet or smartphone.",
        cta: "Found out more"
    }
];

export const Help: FC = () => {
    return (
        <Box
            as="section"
            id="help"
            backgroundImage={`url(${backgroundImage})`}
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            paddingX="space70"
            style={{
                paddingTop: "150px",
                paddingBottom: "150px"
            }}
        >
            <Text textAlign="center" as="h2" style={{ fontWeight: 300 }} fontSize="fontSize110">
                Help where you need it
            </Text>
            <Box marginTop="space200">
                <Grid gutter="space30">
                    {helps.map(({ image, displayText, cta }) => (
                        <Column key={displayText}>
                            <Box
                                cursor="pointer"
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Box marginBottom="space50" maxHeight="120px" as="img" src={image} />
                                <Box maxWidth="300px">
                                    <Text
                                        as="p"
                                        style={{ fontWeight: 300 }}
                                        lineHeight="lineHeight50"
                                        textAlign="center"
                                        fontSize="fontSize80"
                                    >
                                        {displayText}
                                    </Text>
                                </Box>
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
                        </Column>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};
