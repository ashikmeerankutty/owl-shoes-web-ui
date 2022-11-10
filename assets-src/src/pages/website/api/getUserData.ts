import { contactBackend } from "../../../utils/sessionDataHandler";
import { UserData } from "./types";

export const getUserData = async (userId: string) => {
    try {
        return await contactBackend<UserData>("/user", {
            userId
        });
    } catch (e) {
        return Promise.reject(new Error(`Something went wrong when trying to get user: ${e}`));
    }
};
