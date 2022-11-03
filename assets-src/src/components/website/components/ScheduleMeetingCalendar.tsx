import {
    Box,
    DataGrid,
    DataGridBody,
    DataGridCell,
    DataGridHead,
    DataGridHeader,
    DataGridRow,
    Text
} from "@twilio-paste/core";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { updateSchedule } from "../../../store/actions/scheduleActions";
import { getBookingSlots, getNextBookingDates } from "../utils/date";

export const ScheduleMeetingCalendar = () => {
    const nextBookingDates = useMemo(() => getNextBookingDates(), []);
    const slots = getBookingSlots();
    const dispatch = useDispatch();
    const [selectedSlot, setSelectedSlot] = useState<{ slot?: string; dateString?: string }>({});

    const onSlotSelect = (slot: string, dateString: string) => {
        setSelectedSlot({
            slot,
            dateString
        });
        dispatch(
            updateSchedule({
                slot,
                dateString
            })
        );
    };

    return (
        <Box>
            <Text as="p" marginBottom="space30">
                Please pick a time slot that works best for you.
            </Text>
            <DataGrid aria-label="User information table">
                <DataGridHead>
                    <DataGridRow>
                        <DataGridHeader />
                        {nextBookingDates.map(({ dateString }) => (
                            <DataGridHeader key={dateString}>
                                <Text as="p" fontSize="fontSize20" textAlign="center">
                                    {dateString.split(",")[0]}, <br /> {dateString.split(",").slice(1).join(",")}
                                </Text>
                            </DataGridHeader>
                        ))}
                    </DataGridRow>
                </DataGridHead>
                <DataGridBody>
                    {slots.map(({ time, slot }, index) => (
                        <DataGridRow key={slot}>
                            <Box height="40px" paddingX="space30" key={slot}>
                                <Text as="p">{time}</Text>
                            </Box>
                            {nextBookingDates.map(({ slots: bookingSlots, dateString }) => {
                                const { slot: bookingSlot, available } = bookingSlots[index];
                                const { slot: currentSelectedSlot, dateString: selectedDateString } = selectedSlot;
                                const isSlotSelected =
                                    bookingSlot === currentSelectedSlot && selectedDateString === dateString;

                                if (isSlotSelected) {
                                    return (
                                        <Box
                                            key={`${bookingSlot}${dateString}`}
                                            as="td"
                                            onClick={() => onSlotSelect(bookingSlot, dateString)}
                                            backgroundColor="colorBackgroundSuccessLightest"
                                            textAlign="center"
                                        >
                                            {bookingSlot}
                                        </Box>
                                    );
                                }

                                if (available) {
                                    return (
                                        <Box
                                            key={`${bookingSlot}${dateString}`}
                                            as="td"
                                            cursor="pointer"
                                            onClick={() => onSlotSelect(bookingSlot, dateString)}
                                            backgroundColor="colorBackground"
                                        />
                                    );
                                }
                                return (
                                    <Box
                                        key={`${bookingSlot}${dateString}`}
                                        as="td"
                                        backgroundColor="colorBackgroundUnavailable"
                                    />
                                );
                            })}
                        </DataGridRow>
                    ))}
                </DataGridBody>
            </DataGrid>
        </Box>
    );
};
