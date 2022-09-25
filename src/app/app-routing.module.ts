import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScopeGuard } from './core/guards/scope.guard';
import { SecurityGuard } from './core/guards/security.guard';
import { HomeComponent } from './feature/home/home.component';
import { LoginComponent } from './feature/login/login.component';
import { PersonsComponent } from './feature/persons/persons.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [ SecurityGuard, ScopeGuard ]  },
  { path: 'persons', component: PersonsComponent, canActivate: [ SecurityGuard, ScopeGuard ]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
