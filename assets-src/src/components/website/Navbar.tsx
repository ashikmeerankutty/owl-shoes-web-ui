import { FC } from "react";
import { Box, Text } from "@twilio-paste/core";

import { useScrollSpy } from "../hooks/useScrollSpy";
import { PeopleIcon } from "./icons/PeopleIcon";
import { CalculatorIcon } from "./icons/CalculatorIcon";
import { BusinessIcon } from "./icons/BusinessIcon";
import { AutoIcon } from "./icons/AutoIcon";
import { RatesIcon } from "./icons/RatesIcon";

const navbarItems = [
    {
        display: "Branch Information",
        icon: PeopleIcon,
        id: "home"
    },
    {
        display: "Mortgage Calculator",
        icon: CalculatorIcon,
        id: "calculators"
    },
    {
        display: "Business Loans",
        icon: BusinessIcon,
        id: "services"
    },
    {
        display: "Auto Loans",
        icon: AutoIcon,
        id: "help"
    },
    {
        display: "Current Mortgage Rates",
        hoverDisabled: true,
        icon: RatesIcon
    }
];

export const Navbar: FC = () => {
    return (
        <Box
            style={{ boxShadow: "2px 2px 6px rgb(0 0 0 / 15%)" }}
            position="fixed"
            width="110px"
            display="flex"
            flexDirection="column"
            top="76px"
            height="100vh"
            zIndex="zIndex40"
            backgroundColor="colorBackground"
        >
            {navbarItems.map(({ display, icon: Icon }) => {
                return (
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        height="95px"
                        key={display}
                        cursor="pointer"
                        backgroundColor="colorBackground"
                    >
                        <Box paddingX="space40">
                            <Text
                                textAlign="center"
                                lineHeight="lineHeight10"
                                fontSize="fontSize20"
                                textTransform="uppercase"
                                as="p"
                                color="colorTextBrandHighlight"
                            >
                                {display}
                            </Text>
                        </Box>
                        <Box marginTop="space30">
                            <Icon width="23px" color="colorTextBrandHighlight" />
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};
