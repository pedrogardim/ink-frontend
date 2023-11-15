import dayjs from "dayjs";
import clsx from "clsx";

interface TimeSelectorProps {
  value?: Date | string;
  onChange?: (date: Date) => void;
}

const TimeSelector = ({ value, onChange }: TimeSelectorProps) => {
  return (
    <div className="dropdown flex-grow-0 capitalize">
      <label tabIndex={0} className="btn m-1 capitalize">
        {dayjs(value).format("HH:mm")}
      </label>
      <ul
        tabIndex={0}
        className={clsx(
          "dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52",
          "max-h-32 flex-nowrap overflow-y-scroll"
        )}
      >
        {Array(12 * 12 + 1)
          .fill(0)
          .map((_, i) => {
            const tileDate = dayjs(0).add((i + 8 * 12) * 5, "minutes");
            return (
              <li key={i}>
                <a onClick={() => onChange!(tileDate.toDate())}>
                  {tileDate.format("HH:mm")}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default TimeSelector;
