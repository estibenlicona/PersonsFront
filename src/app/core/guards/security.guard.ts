import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { GetScopesResponse } from 'src/app/shared/responses/scopes/get.response';
import { ScopeService } from 'src/app/shared/services/scope.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {

  constructor(private _cookieService: CookieService, private _router: Router, private _scopeService: ScopeService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {

    const cookie: boolean = this._cookieService.check("access_token");

    if (!cookie)  {
      this._cookieService.deleteAll();
      this._router.navigate(['login']);
    }

    return cookie;
  }

}
