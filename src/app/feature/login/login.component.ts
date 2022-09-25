import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AuthResponse } from 'src/app/shared/responses/login/auth.response';
import { LoginService } from 'src/app/shared/services/login.service';
import { Md5 } from 'md5-typescript';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  formLogin = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private _cookieService: CookieService, private _formBuilder: FormBuilder, private _loginService: LoginService, private _router: Router) { }

  ngOnInit(): void {
  }

  OnSubmit(){
    const user: User = {
      username: this.formLogin.controls.username.value,
      password: Md5.init(this.formLogin.controls.password.value)
    }

    this._loginService.Auth(user).subscribe((resp: AuthResponse) => {
      if(resp.user.accessToken != null){
        this._cookieService.set('access_token', resp.user.accessToken, 1, '/');
        this._router.navigate(['/']);
      }

    })
  }

}
