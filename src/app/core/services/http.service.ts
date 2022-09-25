import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?: HttpHeaders;
  params?: HttpParams;
}
@Injectable()
export class HttpService {
  opts!: Options;

  constructor(protected http: HttpClient) {

    this.opts = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  }

  public doGet<T>(serviceUrl: string): Observable<T> {
    return this.http.get<T>(serviceUrl, this.opts);
  }

  public doPost<T, R>(serviceUrl: string, body: T): Observable<R> {
    return this.http.post<R>(serviceUrl, body, this.opts);
  }

  public doPut<T, R>(serviceUrl: string, body: T): Observable<R> {
    return this.http.put<R>(serviceUrl, body, this.opts);
  }

  public doDelete<R>(serviceUrl: string): Observable<R> {
    return this.http.delete<R>(serviceUrl, this.opts);
  }
}

