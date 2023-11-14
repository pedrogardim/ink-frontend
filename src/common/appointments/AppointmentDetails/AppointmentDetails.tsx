import { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
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
  mdiPencil,
  mdiRing,
  mdiWater,
} from "@mdi/js";
import clsx from "clsx";
import { bgColors400 } from "@/utils/colors";

interface AppointmentDetailsProps {
  id?: number;
  existingData?: Appointment;
}
const AppointmentDetails = ({ id, existingData }: AppointmentDetailsProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getAppointment, { data, isLoading, error }] =
    useLazyGetMyAppointmentQuery();

  const appointment = existingData || data || {};

  const { tattooist, startTime, endTime, description, type } =
    appointment as Appointment;

  const onClose = () => navigate("/appointments");

  //TODO: implement actual logic
  const isConfirmed = false;

  useEffect(() => {
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
        {!isLoading && appointment && (
          <div className="flex flex-col">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-700"
              onClick={onClose}
            >
              ✕
            </button>
            <div
              className={clsx(
                "h-48 w-full flex flex-col justify-center items-center text-5xl text-gray-700 font-bold",
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
              <div className="flex -mt-12 items-center gap-x-4">
                <img
                  src={tattooist?.profilePicUrl}
                  alt={tattooist?.firstName}
                  className="rounded-full w-24 h-24 mr-1 border-8 border-base-100"
                />
                <button className="btn btn-circle btn-secondary mr-auto">
                  <Icon path={mdiChat} size={1} />
                </button>
                <button className="btn btn-circle btn-primary">
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
      </div>
    </dialog>
  );
};

export default AppointmentDetails;
