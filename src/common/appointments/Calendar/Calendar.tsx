import { useMemo } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { createCalendarDays } from "@/utils/date";

const weekDayLabels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

interface CalendarProps {
  monthDate?: Date;
  events?: Date[];
  onSelect: (date: Date) => void;
}

const Calendar = ({
  monthDate = new Date(),
  events = [],
  onSelect = () => {},
}: CalendarProps) => {
  const cellClassName =
    "aspect-square flex items-center justify-center transition rounded select-none cursor-pointer";

  const weekEndClassName = "text-gray-600 pointer-events-none";

  const calendarDays = useMemo(
    () => createCalendarDays(monthDate),
    [monthDate]
  );

  return (
    <div className="m-4">
      <h3 className="font-bold text-md text-center w-full mb-2">
        {dayjs(monthDate).format("MMMM YYYY")}
      </h3>
      <div className="flex-1 grid grid-cols-7">
        {weekDayLabels.map((weekday) => (
          <div
            className={clsx(cellClassName, "font-bold text-gray-500 text-sm")}
          >
            {weekday}
          </div>
        ))}
        {calendarDays.map((tile) => (
          <div
            className={clsx(
              cellClassName,
              (tile?.weekDay || 0) >= 5 && weekEndClassName,
              "hover:bg-gray-700"
            )}
            onClick={() =>
              tile && onSelect(dayjs(monthDate).set("date", tile?.day).toDate())
            }
          >
            {tile?.day}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
