import { Appointment } from "@/types/appointment";

export const formatAppointmentTitle = ({
  type,
  tattooist,
}: Appointment): string =>
  `${(type as string)[0].toUpperCase()}${type?.slice(1)} with ${
    tattooist?.firstName
  }`;
