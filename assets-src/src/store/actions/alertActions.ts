import { AlertState } from "../definitions";
import { ACTION_ADD_ALERT, ACTION_REMOVE_ALERT } from "./actionTypes";

export function addAlert(alert: AlertState) {
    return {
        type: ACTION_ADD_ALERT,
        payload: {
            alert
        }
    };
}

export function removeAlert() {
    return {
        type: ACTION_REMOVE_ALERT
    };
}
