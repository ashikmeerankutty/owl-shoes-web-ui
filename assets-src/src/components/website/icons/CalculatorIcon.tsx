import { Box, BoxStyleProps } from "@twilio-paste/core";
import { FC } from "react";

export const CalculatorIcon: FC<BoxStyleProps> = (props) => (
    <Box as="span" boxSizing="border-box" lineHeight="lineHeight0" display="block" {...props}>
        <svg viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.8125 0H2.1875C1.32812 0 0.625 0.703125 0.625 1.5625V23.4375C0.625 24.2969 1.32812 25 2.1875 25H17.8125C18.6719 25 19.375 24.2969 19.375 23.4375V1.5625C19.375 0.703125 18.6719 0 17.8125 0ZM6.875 21.875H3.75V18.75H6.875V21.875ZM6.875 17.1875H3.75V14.0625H6.875V17.1875ZM6.875 12.5H3.75V9.375H6.875V12.5ZM11.5625 21.875H8.4375V18.75H11.5625V21.875ZM11.5625 17.1875H8.4375V14.0625H11.5625V17.1875ZM11.5625 12.5H8.4375V9.375H11.5625V12.5ZM16.25 21.875H13.125V14.0625H16.25V21.875ZM16.25 12.5H13.125V9.375H16.25V12.5ZM16.25 7.8125H3.75V3.125H16.25V7.8125Z"
                fill="currentColor"
            />
        </svg>
    </Box>
);
