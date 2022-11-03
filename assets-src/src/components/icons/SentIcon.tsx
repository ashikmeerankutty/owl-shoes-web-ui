import { Box, BoxStyleProps } from "@twilio-paste/core";
import { FC } from "react";

export const SentIcon: FC<BoxStyleProps> = (props) => (
    <Box as="span" boxSizing="border-box" lineHeight="lineHeight0" display="block" {...props}>
        <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5 0C7.76142 0 10 2.23858 10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0ZM7.29064 3.19454C7.09538 2.99928 6.7788 2.99928 6.58354 3.19454L4.0843 5.69314L3.04754 4.72989C2.85048 4.5467 2.5438 4.55229 2.35356 4.74254L2.32869 4.76786C2.14741 4.96287 2.15854 5.26791 2.35355 5.44919L3.75867 6.7554C3.95573 6.93858 4.26241 6.93299 4.45266 6.74274L4.48302 6.71141L4.48839 6.70533L7.29064 3.90165C7.4859 3.70639 7.4859 3.38981 7.29064 3.19454Z"
                fill="#121C2D"
            />
        </svg>
    </Box>
);
