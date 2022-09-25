import { ApiResponse } from "../api.response";

export class GetScopesResponse extends ApiResponse {
  scopes!: Array<string>;
}
