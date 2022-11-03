import { AnyAction, Reducer } from "redux";

import { ACTION_UPDATE_PHONE_MODAL, ACTION_UPDATE_SCHEDULE_MODAL } from "./actions/actionTypes";
import { NotificationState } from "./definitions";

const initialState = {
    isPhoneModalOpen: false,
    isScheduleModalOpen: false
};

export const ContactModalReducer: Reducer = (state = initialState, action: AnyAction): NotificationState => {
    switch (action.type) {
        case ACTION_UPDATE_PHONE_MODAL:
            return { ...state, isPhoneModalOpen: action.payload.isOpen };
        case ACTION_UPDATE_SCHEDULE_MODAL:
            return { ...state, isScheduleModalOpen: action.payload.isOpen };
        default:
            return state;
    }
};
