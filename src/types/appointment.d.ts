import { User } from "./user";

export type AppointmentType = "tattoo" | "piercing";

export interface Appointment {
  id?: number;
  description?: string;
  startTime?: number;
  endTime?: number;
  clientId?: number;
  tattooistId?: number;
  type?: AppointmentType;
  createdAt?: number;
  updatedAt?: number;
  tattooist?: User;
  client?: User;
}
