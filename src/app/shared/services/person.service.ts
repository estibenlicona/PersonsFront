import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpService } from '../../core/services/http.service';
import { ListPersonResponse } from '../responses/person/list.response';
import { Person } from '../models/person';
import { AddPersonResponse } from '../responses/person/add.response';
import { Observable } from 'rxjs';
import { ApiResponse } from '../responses/api.response';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends HttpService {

  constructor(protected override http: HttpClient) { super(http); }

  public List(size: number, page: number) {
    const endPoint = `${environment.endpoint}/api/person?size=${size}&page=${page}`;
    return this.doGet<ListPersonResponse>(endPoint);
  }

  public Add(person: Person) : Observable<AddPersonResponse> {
    const endPoint = `${environment.endpoint}/api/person`;
    return this.doPost(endPoint, person);
  }

  public Update(person: Person) : Observable<ApiResponse> {
    const endPoint = `${environment.endpoint}/api/person`;
    return this.doPut(endPoint, person);
  }

  public Delete(id: string) : Observable<ApiResponse> {
    const endPoint = `${environment.endpoint}/api/person/${id}`;
    return this.doDelete(endPoint);
  }
}
