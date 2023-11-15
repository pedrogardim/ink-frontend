import { useEffect, useState } from "react";
import dayjs from "dayjs";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import useFormValidation from "@/hooks/useFormValidation";
import { TimeSelector, TattooistSelector, Calendar } from "../..";
import type { Appointment } from "@/types/appointment";
import type { User } from "@/types/user";
import {
  useLazyGetMyAppointmentsQuery,
  useUpdateMyAppointmentMutation,
} from "@/services";
import { showAlert } from "@/store/slices/uiSlice";
import { useDispatch } from "@/store/hooks";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

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
  const {
    values: appointment,
    setValues: setAppointment,
    errors,
    onChange,
    onBlur,
    validateAll,
  } = useFormValidation("appointment", originalAppointment);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, tattooist, tattooistId, description, type, startTime, endTime } =
    appointment as Appointment;

  const [updateAppointment] = useUpdateMyAppointmentMutation();
  const [refreshAppointments] = useLazyGetMyAppointmentsQuery();

  const handleDateChange = (date: Date) => {
    const modifyDay = (time: Date | string) =>
      dayjs(time).set("date", date.getDate()).toDate();

    setAppointment((prev) => ({
      ...prev,
      startTime: modifyDay(prev.startTime),
      endTime: modifyDay(prev.endTime),
    }));
  };

  const handleTimeChange = (type: "startTime" | "endTime", date: Date) => {
    setAppointment((prev) => ({
      ...prev,
      [type]: dayjs(prev[type])
        .set("hour", dayjs(date).hour())
        .set("minute", dayjs(date).minute())
        .toDate(),
    }));
  };

  const handleTattooistChange = (tattooist: User) => {
    setAppointment((prev) => ({
      ...prev,
      tattooist,
      tattooistId: tattooist.id,
    }));
  };

  const handleSubmit = async () => {
    const isValid = validateAll();
    if (!isValid) {
      dispatch(showAlert({ type: "error", message: JSON.stringify(errors) }));
      return;
    }
    const res = await updateAppointment({
      id,
      body: { tattooistId, description, type, startTime, endTime },
    });
    if ("error" in res) {
      dispatch(
        showAlert({
          type: "error",
          message: (res.error as FetchBaseQueryError).data.error.message,
        })
      );
    }
    if ("data" in res) {
      dispatch(showAlert({ type: "success", message: "Appointment saved" }));
      await refreshAppointments({});
      navigate("/appointments");
    }
  };

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
              onSelect={handleDateChange}
            />
          </div>
          <div className="flex flex-row justify-center items-center gap-x-2">
            <TimeSelector
              value={appointment.startTime}
              onChange={(date) => handleTimeChange("startTime", date)}
              max={new Date(appointment.endTime)}
            />
            <span>-</span>
            <TimeSelector
              value={appointment.endTime}
              onChange={(date) => handleTimeChange("endTime", date)}
              min={new Date(appointment.startTime)}
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-y-2">
          <span className="font-bold text-gray-500">Date</span>
          <div className="font-bold text-xl gap-x-2">
            {`${dayjs(startTime).format("D MMM YYYY, HH:mm - ")} 
             ${dayjs(endTime).format("HH:mm ")} 
              (${dayjs(0)
                .set(
                  "hour",
                  dayjs(endTime).get("hour") - dayjs(startTime).get("hour")
                )
                .set(
                  "minute",
                  dayjs(endTime).get("minute") - dayjs(startTime).get("minute")
                )

                .format("HH:mm")}h)`}
          </div>
          <span className="font-bold text-gray-500">Type</span>
          <select
            className="select select-bordered w-56"
            value={type}
            onChange={(e) => onChange("type", e.target.value)}
          >
            <option disabled selected>
              Work type
            </option>
            <option value="tattoo">Tattoo</option>
            <option value="piercing">Piercing</option>
          </select>
          <span className="font-bold text-gray-500">Tattooist</span>
          <div className="flex items-center">
            <TattooistSelector
              tattooist={tattooist}
              onSelect={handleTattooistChange}
            />
          </div>
          <span className="font-bold text-gray-500">Description</span>
          <textarea
            className={clsx(
              "textarea textarea-bordered max-h-36",
              errors.description && "textarea-error"
            )}
            placeholder="Some description..."
            value={description}
            onChange={(e) => onChange("description", e.target.value)}
            onBlur={() => onBlur("description")}
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn mr-2" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditAppointment;
