import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { HttpService } from "./services/http.service";
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { MatButtonModule } from "@angular/material/button";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./intercetors/token-interceptor";
import { SecurityGuard } from "./guards/security.guard";
import { AuthInterceptor } from "./intercetors/auth.interceptor";
import { ScopeGuard } from "./guards/scope.guard";

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
  ],
  exports: [ToolbarComponent],
  providers: [
    HttpService,
    SecurityGuard,
    ScopeGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class CoreModule { }
