import { Box, BoxStyleProps } from "@twilio-paste/core";
import { FC } from "react";

export const RatesIcon: FC<BoxStyleProps> = (props) => (
    <Box as="span" boxSizing="border-box" lineHeight="lineHeight0" display="block" {...props}>
        <svg viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.625 6.4375H21.9844L20.7969 3.125C20.5 2.29687 19.6094 1.4375 18.8125 1.1875C18.8125 1.1875 16.75 0.5625 12.5 0.5625C8.25 0.5625 6.1875 1.1875 6.1875 1.1875C5.40625 1.4375 4.51562 2.29687 4.21875 3.125L3.01562 6.4375H1.375C0.625 6.4375 0 7.09375 0 7.90625C0 8.71875 0.625 9.375 1.375 9.375H1.96875L1.5625 9.9375C1.51562 11.0156 1.5625 12.1875 1.5625 13.0625V20.875C1.5625 21.9062 2.15625 22.4375 3.125 22.4375C4.09375 22.4375 4.6875 21.9062 4.6875 20.875V19.3125H20.3125V20.875C20.3125 21.9062 20.9062 22.4375 21.875 22.4375C22.8438 22.4375 23.4375 21.9062 23.4375 20.875V13.0625C23.4375 12.1875 23.4219 10.9219 23.4375 9.9375L23.0312 9.35938H23.625C24.375 9.35938 25 8.70312 25 7.90625C25 7.09375 24.375 6.4375 23.625 6.4375ZM7.8125 14.625H4.6875V11.5H7.8125V14.625ZM20.3125 14.625H17.1875V11.5H20.3125V14.625ZM20.3125 8.375H4.6875C4.40625 8.375 4.59375 7.09375 4.6875 6.8125L5.82812 4.26562C5.92188 3.98438 5.96875 3.6875 6.25 3.6875H18.75C19.0312 3.6875 19.0781 3.98438 19.1719 4.26562L20.3125 6.8125C20.4062 7.09375 20.5938 8.375 20.3125 8.375Z"
                fill="currentColor"
            />
        </svg>
    </Box>
);
