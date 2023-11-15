import Icon from "@mdi/react";
import { mdiClose, mdiRing, mdiWater } from "@mdi/js";
import { Appointment } from "@/types/appointment";
import { Calendar } from "../../Calendar";
import { TattooistSelector } from "../../TattooistSelector";

interface EditAppointmentProps {
  appointment: Appointment;
  onClose: () => void;
  setIsEditing: (isEditing: boolean) => void;
}

const EditAppointment = ({
  appointment,
  onClose,
  setIsEditing,
}: EditAppointmentProps) => {
  const { id, tattooist, description, type } = appointment as Appointment;

  if (!id) return;

  return (
    <div className="w-full p-8 flex flex-col gap-y-2">
      <button
        className="btn btn-md btn-circle btn-ghost absolute right-2 top-2 text-gray-700"
        onClick={onClose}
      >
        <Icon path={mdiClose} size={1} />
      </button>

      <span className="text-3xl font-bold mr-auto mb-4">Edit appointment</span>
      <div className="flex">
        <div className="flex flex-col flex-1">
          <span className="font-bold text-gray-500">Type</span>
          <div className="flex items-center">
            <span className="font-bold capitalize mr-1">{type}</span>
            <Icon path={type === "tattoo" ? mdiWater : mdiRing} size={1} />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <span className="font-bold text-gray-500">Tattooist</span>
          <div className="flex items-center">
            <TattooistSelector tattooist={tattooist} onSelect={console.log} />
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
  );
};

export default EditAppointment;
