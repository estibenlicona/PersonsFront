import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLogin: Boolean = false;
  title = 'Personas';

  constructor(private _cookieService: CookieService) {
    this.isLogin = this._cookieService.check("access_token");
  }

}
