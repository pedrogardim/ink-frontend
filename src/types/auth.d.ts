import { User } from "./user";

export interface AuthResponse {
  token: string;
  tokenIat: string;
  tokenExp: string;
  user: User;
}
