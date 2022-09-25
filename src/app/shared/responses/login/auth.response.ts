import { User } from "../../models/user";
import { ApiResponse } from "../api.response";

export class AuthResponse extends ApiResponse{
  user!: User;
}
