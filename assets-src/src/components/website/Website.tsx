import { Box, Flex } from "@twilio-paste/core";
import { FC, useEffect } from "react";
import "./Website.css";
import { useNavigate, useParams } from "react-router-dom";

import { Header } from "./Header";
import { Calculators } from "./Calculators";
import { Services } from "./Services";
import { Help } from "./Help";
import { WhatsNew } from "./WhatsNew";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { useWebsite } from "./WebsiteProvider/WebsiteProvider";
import { Loading } from "./Loading";

const WebsiteContent: FC = () => {
    const { userData, userDataLoading, fetchAndUpdateUserData } = useWebsite();
    const { userId } = useParams();
    const navigate = useNavigate();

    const fetchUser = async () => {
        if (!userId) {
            navigate("/404");
        }
        try {
            await fetchAndUpdateUserData(userId as string);
        } catch {
            navigate("/404");
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (!userData || userDataLoading) {
        return <Loading />;
    }
    return (
        <Flex>
            <Box>
                <Navbar />
            </Box>
            <Box style={{ paddingLeft: "110px" }}>
                <Box>
                    <Header />
                    <Calculators />
                    <Services />
                    <Help />
                    <WhatsNew />
                    <Footer />
                </Box>
            </Box>
        </Flex>
    );
};

export const Website: FC = () => {
    return <WebsiteContent />;
};
