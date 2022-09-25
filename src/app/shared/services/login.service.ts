import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "src/app/core/services/http.service";
import { environment } from "src/environments/environment";
import { User } from "../models/user";
import { AuthResponse } from "../responses/login/auth.response";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends HttpService {

  constructor(protected override http: HttpClient) { super(http); }

  public Auth(user: User) : Observable<AuthResponse> {
    const endPoint = `${environment.endpoint}/api/auth`;
    return this.doPost(endPoint, user);
  }

}
