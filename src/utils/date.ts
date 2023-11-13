import dayjs from "dayjs";

export const createCalendarDays = (
  date: Date
): (null | { day: number; weekDay: number })[] => {
  const firstWeekDayOfMonth = (+dayjs(date).startOf("month").day() || 7) - 1;
  const lastDayOfMonth = +dayjs(date).endOf("month").format("DD");

  const prevMonthTiles = Array(firstWeekDayOfMonth).fill(null);
  const currentMonthTiles = Array(lastDayOfMonth)
    .fill(0)
    .map((_, i) => ({
      day: i + 1,
      weekDay: (firstWeekDayOfMonth + i) % 7,
    }));

  const arr = [...prevMonthTiles, ...currentMonthTiles];

  return arr;
};
