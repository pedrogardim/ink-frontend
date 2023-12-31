import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyGetMyAppointmentQuery } from "@/services";
import { useDispatch } from "@/store/hooks";
import { showAlert } from "@/store/slices/uiSlice";
import { Appointment } from "@/types/appointment";
import ViewAppointment from "./partials/ViewAppointment";
import EditAppointment from "./partials/EditAppointment";
import { getNewAppointment } from "@/utils/appointments";

interface AppointmentDetailsProps {
  id?: number;
  existingData?: Appointment;
  isCreating?: boolean;
}
const AppointmentDetails = ({
  id,
  existingData,
  isCreating,
}: AppointmentDetailsProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(!!isCreating);

  const [getAppointment, { data, isLoading, error }] =
    useLazyGetMyAppointmentQuery();

  const appointment = isCreating
    ? getNewAppointment()
    : existingData || data || null;

  const onClose = () => navigate("/appointments");

  useEffect(() => {
    setIsEditing(false);
    if (id && !existingData && !isCreating) getAppointment(id);
  }, [id]);

  useEffect(() => {
    if (error && id) {
      dispatch(showAlert({ type: "error", message: "Appointment not found" }));
      onClose();
    }
  }, [error]);

  useEffect(() => {
    setIsEditing(!!isCreating);
  }, [isCreating]);

  if (!appointment) return;

  return (
    <dialog className="modal modal-open" id="my_modal_7">
      <div className="modal-box p-0 w-11/12 max-w-screen-lg overflow-visible">
        {isLoading && <span className="loading loading-dots loading-lg"></span>}
        {!isLoading && appointment && !isEditing && (
          <ViewAppointment
            appointment={appointment as Appointment}
            onClose={onClose}
            setIsEditing={setIsEditing}
          />
        )}
        {!isLoading && appointment && isEditing && (
          <EditAppointment
            appointment={appointment as Appointment}
            onClose={onClose}
            setIsEditing={setIsEditing}
            isCreating={isCreating}
          />
        )}
      </div>
    </dialog>
  );
};

export default AppointmentDetails;
