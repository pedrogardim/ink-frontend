import dayjs from "dayjs";
import { Appointment } from "@/types/appointment";
import Icon from "@mdi/react";
import {
  mdiChat,
  mdiCheck,
  mdiClock,
  mdiClose,
  mdiPencil,
  mdiRing,
  mdiWater,
} from "@mdi/js";
import clsx from "clsx";
import { bgColors400 } from "@/utils/colors";

interface ViewAppointmentProps {
  appointment: Appointment;
  onClose: () => void;
  setIsEditing: (isEditing: boolean) => void;
}

const ViewAppointment = ({
  appointment,
  onClose,
  setIsEditing,
}: ViewAppointmentProps) => {
  const { id, tattooist, startTime, endTime, description, type } =
    appointment as Appointment;

  //TODO: implement actual logic
  const isConfirmed = true;

  return (
    <div className="flex flex-col">
      <button
        className="btn btn-md btn-circle btn-ghost absolute right-2 top-2 text-gray-700"
        onClick={onClose}
      >
        <Icon path={mdiClose} size={1} />
      </button>
      <div
        className={clsx(
          "w-full flex flex-col justify-center items-center rounded-t-xl",
          "text-gray-700 font-bold",
          "h-36 md:h-48 lg:h-52",
          "text-2xl sm:text-3xl md:text-4xl ",
          bgColors400[id % bgColors400.length]
        )}
      >
        <span>{dayjs(startTime).format("D MMM YYYY")},</span>
        <span>
          {dayjs(startTime).format("h:mma")} - {dayjs(endTime).format("h:mma")}
        </span>
      </div>
      <div className="w-full max-w-screen-md mx-auto px-8 pb-8 flex flex-col gap-y-2">
        <div className="flex -mt-12 items-center">
          <img
            src={tattooist?.profilePicUrl}
            alt={tattooist?.firstName}
            className="rounded-full w-24 h-24 mr-2 border-8 border-base-100 bg-base-100"
          />
          <button className="btn btn-circle btn-secondary mr-auto">
            <Icon path={mdiChat} size={1} />
          </button>
          <button
            className="btn btn-circle btn-primary"
            onClick={() => setIsEditing(true)}
          >
            <Icon path={mdiPencil} size={1} />
          </button>
        </div>
        <div>
          <span className="text-4xl font-bold mr-auto mb-4">
            {tattooist?.firstName} <br />
            {tattooist?.lastName}
          </span>
        </div>
        <div className="flex">
          <div className="flex flex-col flex-1">
            <span className="font-bold text-gray-500">Type</span>
            <div className="flex items-center">
              <span className="font-bold capitalize mr-1">{type}</span>
              <Icon path={type === "tattoo" ? mdiWater : mdiRing} size={1} />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <span className="font-bold text-gray-500">Status</span>
            <div className="flex items-center">
              <span className="font-bold capitalize mr-1">
                {isConfirmed ? "Confirmed" : "Pending"}
              </span>
              <Icon path={isConfirmed ? mdiCheck : mdiClock} size={1} />
            </div>
          </div>
        </div>
        <span className="font-bold text-gray-500">Description</span>
        <p>{description}</p>
        <div className="flex justify-end">
          <button
            className={clsx(
              "btn btn-outline",
              isConfirmed ? "btn-error" : "btn-primary"
            )}
          >
            {isConfirmed ? "Cancel" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointment;
