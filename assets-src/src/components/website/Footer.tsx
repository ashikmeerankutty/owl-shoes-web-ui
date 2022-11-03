/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Text } from "@twilio-paste/core";
import { FC } from "react";

export const Footer: FC = () => {
    return (
        <Box as="section" id="footer">
            <Box>
                <Box as="ol">
                    <Box paddingRight="space60" fontSize="fontSize20" as="li">
                        The origination fee reduction and/or interest rate reductions are offered to clients who are
                        enrolled or are eligible to enroll in Preferred Rewards, based on their rewards tier at the
                        submittal of a loan application for a new purchase or refinance loan (for co-borrowers, at least
                        one applicant must be enrolled or eligible to enroll). The tier is not subject to adjustment
                        after the application is submitted. The origination fee reduction ($200 for Gold tier, $400 for
                        Platinum tier and $600 for Platinum Honors tier) will not exceed the amount of the Lender
                        Origination Fee. In order to receive the full Diamond and Diamond Honors interest rate reduction
                        (0.250% for Diamond tier and 0.375% for Diamond Honors tier) you must have an eligible loan
                        (most conforming and nonconforming loans) and enroll in PayPlan, our automatic payment service,
                        designating an eligible <span>Bank of America</span> checking or savings account at least 10
                        days prior to loan closing. If PayPlan enrollment is not completed 10 days prior to loan
                        closing, or if the loan is a product ineligible for PayPlan (like FHA loan products) the Diamond
                        and Diamond Honors tiers receive a 0.125% interest rate reduction benefit. For adjustable rate
                        mortgages (except PrimeFirst<sup>®</sup>), the discounts are applied to the interest rate only
                        during the initial fixed-rate period. For PrimeFirst<sup>®</sup> adjustable rate mortgages, the
                        discount is applied to the margin and cannot reduce the margin below 0%. Eligibility will be
                        determined three or more business days after the day the requirements are satisfied. Some reward
                        benefits cannot be combined with other offers. All mortgage interest rate reduction offers are
                        subject to a maximum interest rate reduction limit. For details on requirements, visit the
                        Preferred Rewards section of the <a href="#">Personal Schedule of Fees</a>
                        . Benefit is non-transferable. Preferred Rewards benefits are not available with Custom
                        Residential Real Estate financing.
                        <br />
                        <br />
                        To enroll in the Preferred Rewards program you must have an active, eligible personal checking
                        account with{" "}
                        <span>
                            Bank of America<sup>®</sup>
                        </span>{" "}
                        and maintain the balance required for one of the balance tiers in your combined qualifying{" "}
                        <span>Bank of America</span> deposit accounts (such as checking, savings, certificate of
                        deposit) and/or your Merrill investment accounts (such as Cash Management Accounts, 529 Plans).
                        You can satisfy the combined balance requirement for enrollment with either:
                        <br />
                        <br />
                        <ul>
                            <li style={{ marginLeft: "1.125rem", listStyle: "lower-roman" }}>
                                a three-month combined average daily balance in your qualifying deposit and investment
                                accounts or
                            </li>
                            <li style={{ marginLeft: "1.125rem", listStyle: "lower-roman" }}>
                                a current combined balance, provided that you enroll at the time you open your first
                                eligible personal checking account and satisfy the balance requirement at the end of at
                                least one day within 30 days of opening that account.
                            </li>
                        </ul>
                        You must have a qualifying balance of at least $20,000 for the Gold tier, $50,000 for the
                        Platinum tier, $100,000 for the Platinum Honors tier, $1,000,000 for the Diamond tier and
                        $10,000,000 for the Diamond Honors tier. If Private Bank clients included:{" "}
                        <span>Bank of America</span> Private Bank clients qualify to enroll in the Diamond tier, and may
                        qualify for the Diamond Honors tier based on their qualifying <span>Bank of America</span>,
                        Merrill, and Private Bank balances. Refer to your <a href="#">Personal Schedule of Fees</a> for
                        details on accounts that qualify towards the combined balance calculation and receive program
                        benefits. Eligibility to enroll is generally available three or more business days after the end
                        of the calendar month in which you satisfy the requirements. Benefits become effective within 30
                        days of your enrollment, or for new accounts within 30 days of account opening, unless we
                        indicate otherwise. Certain benefits are also available without enrolling in Preferred Rewards
                        if you satisfy balance and other requirements.
                    </Box>
                    <Box fontSize="fontSize20" as="li">
                        Mobile banking requires that you download the Mobile Banking app and is only available for
                        select mobile devices. Message and data rates may apply.
                    </Box>
                </Box>
                <Box paddingX="space60" marginBottom="space100" display="flex" flexDirection="column" rowGap="space30">
                    <Text fontSize="fontSize20" as="p">
                        Credit and collateral are subject to approval. Terms and conditions apply. This is not a
                        commitment to lend. Programs, rates, terms and conditions are subject to change without notice.
                    </Text>
                    <Text fontSize="fontSize20" as="p">
                        Apple, the Apple logo, iPhone, and MacBook Air are trademarks of Apple Inc., registered in the
                        U.S. and other countries. App Store is a service mark of Apple Inc.
                    </Text>
                    <Text fontSize="fontSize20" as="p">
                        Bank of America, N.A. Member FDIC. Equal Housing Lender Equal Housing Lender
                    </Text>
                    <Text fontSize="fontSize20" as="p">
                        © 2022 Bank of America Corporation. MAP4424393
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};
