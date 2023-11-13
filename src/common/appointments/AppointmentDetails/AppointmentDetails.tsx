import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetMyAppointmentQuery,
  useLazyGetMyAppointmentQuery,
} from "@/services";
import { useDispatch } from "@/store/hooks";
import { showAlert } from "@/store/slices/uiSlice";
import { Appointment } from "@/types/appointment";
import { formatAppointmentTitle } from "@/utils/appointments";

interface AppointmentDetailsProps {
  id?: number;
  existingData?: Appointment;
}
const AppointmentDetails = ({ id, existingData }: AppointmentDetailsProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getAppointment, { data, isLoading, error }] =
    useLazyGetMyAppointmentQuery();

  const appointment = existingData || data;

  const onClose = () => navigate("/appointments");

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
    <dialog className="modal modal-open">
      <div className="modal-box">
        {isLoading && <span className="loading loading-dots loading-lg"></span>}
        {!isLoading && appointment && (
          <>
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>
            <h1 className="text-3xl font-bold mr-auto mb-4">
              {formatAppointmentTitle(appointment)}
            </h1>
          </>
        )}
      </div>
    </dialog>
  );
};

export default AppointmentDetails;
