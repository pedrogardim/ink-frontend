import dayjs from "dayjs";
import { Appointment } from "@/types/appointment";

export const formatAppointmentTitle = ({
  type,
  tattooist,
}: Appointment): string =>
  `${(type as string)[0].toUpperCase()}${type?.slice(1)} with ${
    tattooist?.firstName
  }`;

export const getNewAppointment = () => ({
  startTime: dayjs().add(1, "day").startOf("day").set("hour", 12).toDate(),
  endTime: dayjs().add(1, "day").startOf("day").set("hour", 13).toDate(),
});
