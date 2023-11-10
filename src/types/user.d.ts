export type UserRoleType = "client" | "tattooist" | "admin" | "super_admin";

export interface User {
  id?: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  role?: UserRoleType;
  createdAt?: string;
  updatedAt?: string;
}
