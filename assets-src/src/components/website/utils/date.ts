export const getBookingSlots = () => {
    const x = 60; // minutes interval
    const times = []; // time array
    let tt = 8 * 60; // start time
    const et = 18;
    const ap = ["AM", "PM"]; // AM-PM

    // loop to increment the time and push results in array
    for (let i = 0; tt < et * 60; i += 1) {
        const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
        const nhh = hh + 1;
        const mm = tt % 60; // getting minutes of the hour in 0-55 format
        const time = `${`0${hh === 12 ? hh : hh % 12}`.slice(-2)}:${`0${mm}`.slice(-2)} ${ap[Math.floor(hh / 12)]}`;
        const slot = `${time} - ${`0${nhh === 12 ? nhh : nhh % 12}`.slice(-2)}:${`0${mm}`.slice(-2)} ${
            ap[Math.floor(nhh / 12)]
        }`;
        times[i] = {
            time,
            slot
        }; // pushing data in array in [00:00 - 12:00 AM/PM format]
        tt += x;
    }
    return times;
};

export const getNextBookingDates = () => {
    let count = 0;
    const bookingDates = [];
    const times = getBookingSlots();
    const currentDate = new Date();
    while (count < 5) {
        const toAddDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
        if (toAddDate.getDay() !== 0 && toAddDate.getDay() !== 6) {
            const randomSlotLength = Math.random() * 10;
            const slotsUsed = new Set([
                ...Array.from({ length: randomSlotLength }, () => Math.floor(Math.random() * 10))
            ]);
            bookingDates.push({
                date: toAddDate,
                dateString: toAddDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }),
                slots: times.map(({ time, slot }, index) => ({
                    slot,
                    available: !slotsUsed.has(index),
                    time
                }))
            });
            // Date.getDay() gives weekday starting from 0(Sunday) to 6(Saturday)
            count += 1;
        }
    }

    console.log(bookingDates);

    return bookingDates;
};
