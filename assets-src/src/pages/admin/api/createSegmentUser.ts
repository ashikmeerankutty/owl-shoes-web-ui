import { contactBackend } from "../../../utils/sessionDataHandler";
import { EmailData } from "./types";

export const createSegmentUser = async (email: string, phone: string) => {
    try {
        return await contactBackend<EmailData>("/createSegmentUser", {
            email,
            phone
        });
    } catch (e) {
        return Promise.reject(new Error(`Something went wrong when trying to send email: ${e}`));
    }
};
