import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpService } from "src/app/core/services/http.service";
import { environment } from "src/environments/environment";
import { GetScopesResponse } from "../responses/scopes/get.response";

@Injectable({
  providedIn: 'root'
})
export class ScopeService extends HttpService {

  private scopes$: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);

  constructor(protected override http: HttpClient) { super(http); }

  public Get() : Observable<GetScopesResponse>{
    const endPoint = `${environment.endpoint}/api/role`;
    return this.doGet(endPoint);
  }

  get GetScopes() : Observable<Array<string>>{
    return this.scopes$.asObservable();
  }

  set SetScopes(scopes: Array<string>){
      this.scopes$.next(scopes);
  }
}
