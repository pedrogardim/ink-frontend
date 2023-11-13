import { useMemo } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { createCalendarDays } from "@/utils/date";

const weekDayLabels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

interface CalendarProps {
  monthDate?: Date;
  events?: (Date | string)[];
  onSelect: (date: Date) => void;
}

const Calendar = ({
  monthDate = new Date(),
  events = [],
  onSelect = () => {},
}: CalendarProps) => {
  const cellClassName =
    "aspect-square flex items-center justify-center transition rounded select-none cursor-pointer relative";

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
        {calendarDays.map((tile) => {
          const dayDate =
            tile && dayjs(monthDate).set("date", tile?.day).toDate();
          return (
            <div
              className={clsx(
                cellClassName,
                (tile?.weekDay || 0) >= 5 && weekEndClassName,
                "hover:bg-gray-700"
              )}
              onClick={() => tile && onSelect(dayDate as Date)}
            >
              {tile?.day}
              {events.find((e) => dayjs(e).isSame(dayDate, "day")) && (
                <div className="absolute w-1 h-1 rounded-full bg-secondary bottom-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
