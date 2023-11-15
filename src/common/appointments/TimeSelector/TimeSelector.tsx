import dayjs from "dayjs";
import clsx from "clsx";

interface TimeSelectorProps {
  value?: Date | string;
  onChange?: (date: Date) => void;
  min?: Date;
  max?: Date;
}

const TimeSelector = ({
  value,
  onChange,
  min = dayjs("1/1/1 9:00").toDate(),
  max = dayjs("1/1/1 21:00").toDate(),
}: TimeSelectorProps) => {
  const timeSelLength =
    (dayjs(max).hour() * 60 +
      dayjs(max).minute() -
      (dayjs(min).hour() * 60 + dayjs(min).minute())) /
      5 +
    1;

  return (
    <div className="dropdown flex-grow-0 capitalize">
      <label tabIndex={0} className="btn m-1 capitalize">
        {dayjs(value).format("HH:mm")}
      </label>
      <ul
        tabIndex={0}
        className={clsx(
          "dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36",
          "max-h-32 flex-nowrap overflow-y-scroll"
        )}
      >
        {Array(timeSelLength)
          .fill(0)
          .map((_, i) => {
            const date = dayjs(min).add(i * 5, "minutes");
            return (
              <li key={i}>
                <a onClick={() => onChange!(date.toDate())}>
                  {date.format("HH:mm")}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default TimeSelector;
