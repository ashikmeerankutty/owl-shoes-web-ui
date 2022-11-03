import { AnyAction, Reducer } from "redux";

import { ScheduleState } from "./definitions";
import { ACTION_UPDATE_SCHEDULE } from "./actions/actionTypes";

const initialState: ScheduleState = {
    slot: "",
    dateString: ""
};

export const ScheduleReducer: Reducer = (state: ScheduleState = initialState, action: AnyAction): ScheduleState => {
    switch (action.type) {
        case ACTION_UPDATE_SCHEDULE:
            return { ...state, ...action.payload.schedule };
        default:
            return state;
    }
};
