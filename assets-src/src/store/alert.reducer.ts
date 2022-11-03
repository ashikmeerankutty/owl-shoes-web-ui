import { AnyAction, Reducer } from "redux";

import { ACTION_ADD_ALERT, ACTION_REMOVE_ALERT } from "./actions/actionTypes";
import { AlertState } from "./definitions";

const initialState: AlertState = {
    message: "",
    variant: "neutral"
};

export const AlertReducer: Reducer = (state: AlertState = initialState, action: AnyAction): AlertState => {
    switch (action.type) {
        case ACTION_ADD_ALERT:
            return { ...state, ...action.payload.alert };

        case ACTION_REMOVE_ALERT:
            return { ...state, message: "" };
        default:
            return state;
    }
};
