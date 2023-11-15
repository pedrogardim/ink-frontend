import { useState, useMemo, useEffect } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import { createCalendarDays } from "@/utils/date";
import { mdiArrowLeft, mdiArrowRight } from "@mdi/js";
import Icon from "@mdi/react";

const weekDayLabels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const cellClass = clsx(
  "aspect-square relative p-1 rounded",
  "flex items-center justify-center transition",
  "select-none cursor-pointer",
  "hover:bg-gray-700"
);

const selectedTileClass = "bg-gray-500 text-base-100";
const disabledTileClass = "text-gray-600 pointer-events-none";

const weekdayTileClass = "font-bold text-gray-500 text-sm pointer-events-none";

interface CalendarProps {
  monthDate?: Date;
  events?: (Date | string)[];
  onSelect?: (date: Date) => void;
  selectedDate?: Date;
  pagination?: boolean;
}

const Calendar = ({
  monthDate = new Date(),
  events = [],
  onSelect = () => {},
  selectedDate,
  pagination = false,
}: CalendarProps) => {
  const [selectedMonth, setSelectedMonth] = useState(monthDate);

  const calendarDays = useMemo(
    () => createCalendarDays(selectedMonth),
    [selectedMonth]
  );

  const onMonthChange = (value: number) => {
    setSelectedMonth((p) => dayjs(p).add(value, "month").toDate());
  };

  useEffect(() => {
    setSelectedMonth(dayjs(monthDate).startOf("month").toDate());
  }, [monthDate]);

  return (
    <div className="m-4">
      <div className="flex justify-between items-center">
        {pagination && (
          <button
            className="btn btn-circle btn-sm"
            onClick={() => onMonthChange(-1)}
          >
            <Icon path={mdiArrowLeft} size={0.8} />
          </button>
        )}
        <h3 className="font-bold text-md text-center w-full mb-2">
          {dayjs(selectedMonth).format("MMMM YYYY")}
        </h3>
        {pagination && (
          <button
            className="btn btn-circle btn-sm"
            onClick={() => onMonthChange(1)}
          >
            <Icon path={mdiArrowRight} size={0.8} />
          </button>
        )}
      </div>

      <div className="flex-1 grid grid-cols-7">
        {weekDayLabels.map((weekday) => (
          <div key={weekday} className={clsx(cellClass, weekdayTileClass)}>
            {weekday}
          </div>
        ))}
        {calendarDays.map((tile, i) => {
          const dayDate =
            tile && dayjs(selectedMonth).set("date", tile?.day).toDate();
          return (
            <div
              key={i}
              className={clsx(
                cellClass,
                ((tile?.weekDay || 0) >= 5 || !tile) && disabledTileClass,
                selectedDate &&
                  dayDate &&
                  +dayjs(selectedDate).startOf("day") === +dayDate &&
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
