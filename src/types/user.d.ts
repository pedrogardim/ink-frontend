import type { TattooWork } from "./tattoowork";

export type UserRoleType = "client" | "tattooist" | "admin" | "super_admin";

export interface User {
  id?: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  profilePicUrl?: string;
  role?: UserRoleType;
  createdAt?: string;
  updatedAt?: string;
  tattooWorks: TattooWork[];
}
