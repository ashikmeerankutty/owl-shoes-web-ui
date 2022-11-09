import { contactBackend } from "../../../sessionDataHandler";
import { EmailData } from "./types";

export const sendEmail = async (email: string) => {
    try {
        return await contactBackend<EmailData>("/sendEmail", {
            email
        });
    } catch (e) {
        return Promise.reject(new Error(`Something went wrong when trying to send email: ${e}`));
    }
};
