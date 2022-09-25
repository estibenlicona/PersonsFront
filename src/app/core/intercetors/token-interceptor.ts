import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept<T,R>(req: HttpRequest<T>, next: HttpHandler):
  Observable<HttpEvent<R>> {
    const access_token = this.cookieService.get('access_token');
    if (access_token && req.url.indexOf('auth') == -1) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${access_token}`)
      });


      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
