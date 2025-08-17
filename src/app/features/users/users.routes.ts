import {Routes} from "@angular/router";
import {LoginPage} from "./pages/login/login.page";
import {RegisterPage} from "./pages/register/register.page";
import {authGuard} from "../../core/auth.guard";
import {ProfilePage} from "./pages/profile/profile.page";


export const UserRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage,
    title: 'Página de Login'
  },
  {
    path: 'register',
    component: RegisterPage,
    title: 'Página de Registro'
  },
  {
    path: 'perfil',
    component: ProfilePage,
    title: 'Meu perfil',
    canActivate: [authGuard]
  }
];
