import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GetScopesResponse } from 'src/app/shared/responses/scopes/get.response';
import { ScopeService } from 'src/app/shared/services/scope.service';

@Injectable({
  providedIn: 'root'
})
export class ScopeGuard implements CanActivate {

  constructor(private _scopeService: ScopeService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this._scopeService.Get().subscribe((resp: GetScopesResponse) => {
      this._scopeService.SetScopes = resp.scopes;
    });

    return true;
  }

}
