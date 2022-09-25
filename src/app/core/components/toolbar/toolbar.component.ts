import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ScopeService } from 'src/app/shared/services/scope.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  public scopes$!: Observable<Array<string>>;
  bPerson: boolean = false;

  constructor(private _router: Router, private _cookieService: CookieService, private _scopeService: ScopeService) {
  }

  ngOnInit(): void {
    this._scopeService.GetScopes.subscribe(x => {
      this.bPerson = x.filter(x => "Persons.Read").length > 0  ? true : false;
    });
  }

  public LogOut(){
    this._cookieService.deleteAll();
    this._router.navigate(['/', 'login']);
  }

}
