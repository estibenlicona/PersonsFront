import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

const UNAUTHORIZED = 401;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly router: Router, private _cookieService: CookieService) { }

  intercept<T,R>(req: HttpRequest<T>, next: HttpHandler):
  Observable<HttpEvent<R>> {

    return next.handle(req).pipe(catchError(err => {
      if(err.status == UNAUTHORIZED){
        this.router.navigate(['/login']);
        this._cookieService.deleteAll();
      }
      return throwError(() => err);
    }));
  }
}

