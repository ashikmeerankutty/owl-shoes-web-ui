import { useState } from "react";

import { createSegmentUser } from "../api/createSegmentUser";
import { sendEmail } from "../api/sendEmail";

enum Status {
    IDLE,
    SENDING_EMAIL
}

interface InviteResponse {
    email: string;
    phone: string;
    setEmail: (email: string) => void;
    setPhone: (phone: string) => void;
    sendPromotionalEmail: () => void;
    isEmailSending: boolean;
}

export const useInvite = (): InviteResponse => {
    const [status, setStatus] = useState(Status.IDLE);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const sendPromotionalEmail = async () => {
        setStatus(Status.SENDING_EMAIL);
        try {
            await createSegmentUser(email, phone);
            await sendEmail(email, phone);
        } catch {
        } finally {
            setStatus(Status.IDLE);
        }
    };

    return {
        email,
        phone,
        setEmail,
        setPhone,
        sendPromotionalEmail,
        isEmailSending: status === Status.SENDING_EMAIL
    };
};
