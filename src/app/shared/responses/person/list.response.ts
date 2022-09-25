import { Person } from "../../models/person";
import { ApiResponse } from "../api.response";

export class ListPersonResponse extends ApiResponse {
  count!: number;
  persons!: Array<Person>;
}
