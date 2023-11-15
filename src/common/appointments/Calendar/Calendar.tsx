import { useMemo } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { createCalendarDays } from "@/utils/date";

const weekDayLabels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

interface CalendarProps {
  monthDate?: Date;
  events?: (Date | string)[];
  onSelect?: (date: Date) => void;
  selectedDate?: Date;
}

const Calendar = ({
  monthDate = new Date(),
  events = [],
  onSelect = () => {},
  selectedDate,
}: CalendarProps) => {
  const cellClass = clsx(
    "aspect-square relative p-1 rounded",
    "flex items-center justify-center transition",
    "select-none cursor-pointer",
    "hover:bg-gray-700"
  );

  const selectedTileClass = "bg-gray-500 text-base-100";
  const disabledTileClass = "text-gray-600 pointer-events-none";

  const weekdayTileClass =
    "font-bold text-gray-500 text-sm pointer-events-none";

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
          <div key={weekday} className={clsx(cellClass, weekdayTileClass)}>
            {weekday}
          </div>
        ))}
        {calendarDays.map((tile, i) => {
          const dayDate =
            tile && dayjs(monthDate).set("date", tile?.day).toDate();
          return (
            <div
              key={i}
              className={clsx(
                cellClass,
                ((tile?.weekDay || 0) >= 5 || !tile) && disabledTileClass,
                selectedDate &&
                  dayDate &&
                  +selectedDate === +dayDate &&
                  selectedTileClass
              )}
              onClick={() => tile && onSelect(dayDate as Date)}
            >
              {tile?.day}
              {events.find((e) => dayjs(e).isSame(dayDate, "day")) && (
                <div className="absolute w-1 h-1 rounded-full bg-secondary bottom-[2px]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
