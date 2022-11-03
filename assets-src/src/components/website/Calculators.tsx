import { Box, Column, Grid, Text } from "@twilio-paste/core";
import { FC } from "react";

import savingsImage from "../../assets/savings.png";

export const Calculators: FC = () => {
    return (
        <Box marginX="space60" borderRadius="borderRadius20" overflow="hidden" as="section" id="calculators">
            <Grid>
                <Column span={7}>
                    <Box paddingX="space60" paddingY="space120" backgroundColor="colorBackgroundPrimaryWeaker">
                        <Text
                            fontSize="fontSize110"
                            lineHeight="lineHeight100"
                            fontWeight="fontWeightLight"
                            color="colorTextBrandInverse"
                            as="p"
                        >
                            Start saving today with
                            <br /> Cloud City Bank SmartSave.
                        </Text>
                        <Box marginTop="space60">
                            <Text fontSize="fontSize60" lineHeight="lineHeight50" color="colorTextBrandInverse" as="p">
                                Apply today and see if you qualify for Cloud City Bank’s smart save program. Terms and
                                conditions apply. Apply today and see if you qualify for Cloud City Bank’s smart save program.
                                Terms and conditions apply.
                            </Text>
                        </Box>
                    </Box>
                </Column>
                <Column span={5}>
                    <Box height="100%" backgroundImage={`url(${savingsImage})`} />
                </Column>
            </Grid>
        </Box>
    );
};
