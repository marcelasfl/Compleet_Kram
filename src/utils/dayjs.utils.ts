import dayjs from "dayjs";

export function disableDateGreaterToday(current: dayjs.Dayjs) {
    return current && current > dayjs().endOf('day');
};