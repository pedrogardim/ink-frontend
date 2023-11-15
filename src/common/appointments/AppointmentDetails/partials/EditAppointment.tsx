import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Icon from "@mdi/react";
import { mdiClose, mdiRing, mdiWater } from "@mdi/js";
import { Appointment } from "@/types/appointment";
import { Calendar } from "../../Calendar";
import { TattooistSelector } from "../../TattooistSelector";
import { TimeSelector } from "../..";

interface EditAppointmentProps {
  appointment: Appointment;
  onClose: () => void;
  setIsEditing: (isEditing: boolean) => void;
}

const EditAppointment = ({
  appointment: originalAppointment,
  onClose,
  setIsEditing,
}: EditAppointmentProps) => {
  const [appointment, setAppointment] = useState(originalAppointment);
  const { id, tattooist, description, type } = appointment as Appointment;

  useEffect(() => {
    setAppointment(originalAppointment);
  }, [originalAppointment]);

  if (!appointment) return;

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
        <div className="flex flex-col flex-1 justify-center items-center">
          <div className="flex-1 w-full max-w-xs">
            <Calendar
              pagination
              selectedDate={new Date(appointment.startTime)}
              monthDate={new Date(appointment.startTime)}
            />
          </div>
          <div className="flex flex-row justify-center items-center">
            <TimeSelector
              value={appointment.startTime}
              onChange={console.log}
            />
            {"-"}
            <TimeSelector value={appointment.endTime} onChange={console.log} />
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-y-2">
          <span className="font-bold text-gray-500">Type</span>
          <div className="dropdown flex-grow-0 capitalize">
            <label tabIndex={0} className="btn m-1 capitalize">
              {type}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 absolute"
            >
              {["tattoo", "piercieng"].map((e) => (
                <li key={e}>
                  <a>{e}</a>
                </li>
              ))}
            </ul>
          </div>
          <span className="font-bold text-gray-500">Tattooist</span>
          <div className="flex items-center">
            <TattooistSelector tattooist={tattooist} onSelect={console.log} />
          </div>
          <span className="font-bold text-gray-500">Description</span>
          <textarea
            className="textarea textarea-bordered max-h-36"
            placeholder="Some description..."
            value={description}
          ></textarea>
        </div>
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
