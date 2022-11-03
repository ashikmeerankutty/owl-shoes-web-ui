import { ScheduleState } from "../definitions";
import { ACTION_UPDATE_SCHEDULE } from "./actionTypes";

export function updateSchedule(schedule: ScheduleState) {
    return {
        type: ACTION_UPDATE_SCHEDULE,
        payload: {
            schedule
        }
    };
}
