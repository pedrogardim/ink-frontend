import clsx from "clsx";
import dayjs from "dayjs";
import { Appointment } from "@/types/appointment";
import { bgColors400 } from "@/utils/colors";
interface AppointmentCardProps {
  appointment: Appointment;
  sameDayAsPrevious?: boolean;
}
const AppointmentCard = ({
  appointment,
  sameDayAsPrevious,
}: AppointmentCardProps) => {
  const { id, description, tattooist, type, startTime } = appointment;

  const cardTitle = `${(type as string)[0].toUpperCase()}${type?.slice(
    1
  )} with ${tattooist?.firstName}`;
  return (
    <div>
      {!sameDayAsPrevious && (
        <div className="flex flex-row w-full mx-4 my-1 md:my-2 md:flex-col items-center md:items-start">
          <span className="text-md md:text-xl">
            {dayjs(startTime).format("MMM")}
          </span>
          <span className="text-xl md:text-3xl font-bold ml-1 md:ml-0">
            {dayjs(startTime).format("D")}
          </span>
        </div>
      )}
      <div
        className={clsx(
          "custom-btn rounded-3xl shadow-xl flex items-center p-3 text-gray-700 mb-2 md:mb-4",
          bgColors400[id % bgColors400.length]
        )}
      >
        <div className="flex flex-col items-center rounded-full py-4 pl-3 pr-1">
          <div className="text-xl font-bold">
            {dayjs(startTime).format("HH:mm")}
          </div>
        </div>
        <img
          src={tattooist?.profilePicUrl}
          alt={tattooist?.firstName}
          className="rounded-full w-16 h-16 mr-1 hidden md:flex"
        />
        <div className="flex flex-col p-1 gap-y-2 flex-1 items-start text-start">
          <div className="flex items-center">
            <img
              src={tattooist?.profilePicUrl}
              alt={tattooist?.firstName}
              className="rounded-full w-8 h-8 mr-1 md:hidden"
            />
            <div className="text-2xl font-bold line-clamp-1">{cardTitle}</div>
          </div>
          <p className="line-clamp-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
