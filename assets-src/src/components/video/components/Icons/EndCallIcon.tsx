import { Box, BoxStyleProps } from "@twilio-paste/core";
import { FC } from "react";

export const EndCallIcon: FC<BoxStyleProps> = (props) => (
    <Box
        as="span"
        boxSizing="border-box"
        lineHeight="lineHeight0"
        display="block"
        width="1.25rem"
        height="1.25rem"
        {...props}
    >
        <svg color="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="none" />
            <g transform="translate(2 8)">
                <path
                    d="M7.02,15.976,5.746,13.381a.7.7,0,0,0-.579-.407l-1.032-.056a.662.662,0,0,1-.579-.437,9.327,9.327,0,0,1,0-6.5.662.662,0,0,1,.579-.437l1.032-.109a.7.7,0,0,0,.589-.394L7.03,2.446l.331-.662a.708.708,0,0,0,.07-.308.692.692,0,0,0-.179-.467A3,3,0,0,0,4.693.017l-.235.03L4.336.063A1.556,1.556,0,0,0,4.17.089l-.162.04C1.857.679.165,4.207,0,8.585V9.83c.165,4.372,1.857,7.9,4,8.483l.162.04a1.556,1.556,0,0,0,.165.026l.122.017.235.03a3,3,0,0,0,2.558-.993.692.692,0,0,0,.179-.467.708.708,0,0,0-.07-.308Z"
                    transform="translate(18.936 0.506) rotate(90)"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                />
            </g>
        </svg>
    </Box>
);
