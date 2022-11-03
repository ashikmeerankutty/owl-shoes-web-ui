import { ScheduleState } from "../../../store/definitions";

export const getFriendlySlotText = (schedule: ScheduleState) => {
    try {
        const day = schedule.dateString.split(",")[1];
        const time = schedule.slot.split("-")[0];
        return `${day} at ${time}`;
    } catch {
        return "";
    }
};
