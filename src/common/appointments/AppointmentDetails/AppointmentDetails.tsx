import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useLazyGetMyAppointmentQuery } from "@/services";
import { useDispatch } from "@/store/hooks";
import { showAlert } from "@/store/slices/uiSlice";
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
import { Calendar } from "..";
import { TattooistSelector } from "../TattooistSelector";

interface AppointmentDetailsProps {
  id?: number;
  existingData?: Appointment;
}
const AppointmentDetails = ({ id, existingData }: AppointmentDetailsProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [getAppointment, { data, isLoading, error }] =
    useLazyGetMyAppointmentQuery();

  const appointment = existingData || data || {};

  const { tattooist, startTime, endTime, description, type } =
    appointment as Appointment;

  const onClose = () => navigate("/appointments");

  //TODO: implement actual logic
  const isConfirmed = true;

  useEffect(() => {
    setIsEditing(false);
    if (id && !existingData) {
      getAppointment(id);
    }
  }, [id]);

  useEffect(() => {
    if (error && id) {
      dispatch(showAlert({ type: "error", message: "Appointment not found" }));
      onClose();
    }
  }, [error]);

  if (!id) return;

  return (
    <dialog className="modal modal-open" id="my_modal_7">
      <div className="modal-box p-0 w-11/12 max-w-screen-lg">
        {isLoading && <span className="loading loading-dots loading-lg"></span>}
        {!isLoading && appointment && !isEditing && (
          <div className="flex flex-col">
            <button
              className="btn btn-md btn-circle btn-ghost absolute right-2 top-2 text-gray-700"
              onClick={onClose}
            >
              <Icon path={mdiClose} size={1} />
            </button>
            <div
              className={clsx(
                "w-full flex flex-col justify-center items-center ",
                "text-gray-700 font-bold",
                "h-36 md:h-48 lg:h-52",
                "text-2xl sm:text-3xl md:text-4xl ",
                bgColors400[id % bgColors400.length]
              )}
            >
              <span>{dayjs(startTime).format("D MMM YYYY")},</span>
              <span>
                {dayjs(startTime).format("h:mma")} -{" "}
                {dayjs(endTime).format("h:mma")}
              </span>
            </div>
            <div className="w-full max-w-screen-md mx-auto px-8 pb-8 flex flex-col gap-y-2">
              <div className="flex -mt-12 items-center">
                <img
                  src={tattooist?.profilePicUrl}
                  alt={tattooist?.firstName}
                  className="rounded-full w-24 h-24 mr-2 border-8 border-base-100"
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
                    <Icon
                      path={type === "tattoo" ? mdiWater : mdiRing}
                      size={1}
                    />
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
        )}
        {!isLoading && appointment && isEditing && (
          <div className="w-full p-8 flex flex-col gap-y-2">
            <button
              className="btn btn-md btn-circle btn-ghost absolute right-2 top-2 text-gray-700"
              onClick={onClose}
            >
              <Icon path={mdiClose} size={1} />
            </button>

            <span className="text-3xl font-bold mr-auto mb-4">
              Edit appointment
            </span>
            <div className="flex">
              <div className="flex flex-col flex-1">
                <span className="font-bold text-gray-500">Type</span>
                <div className="flex items-center">
                  <span className="font-bold capitalize mr-1">{type}</span>
                  <Icon
                    path={type === "tattoo" ? mdiWater : mdiRing}
                    size={1}
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <span className="font-bold text-gray-500">Tattooist</span>
                <div className="flex items-center">
                  <TattooistSelector
                    tattooist={tattooist}
                    onSelect={console.log}
                  />
                </div>
              </div>
            </div>
            <span className="font-bold text-gray-500">Description</span>
            <p>{description}</p>
            <div className="flex">
              <Calendar />
            </div>

            <div className="flex justify-end">
              <button className="btn mr-2" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
};

export default AppointmentDetails;
