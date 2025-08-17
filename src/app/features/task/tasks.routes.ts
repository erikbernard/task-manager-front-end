import {Routes} from "@angular/router";
import {authGuard} from "../../core/auth.guard";
import {ListPage} from "./pages/list.page/list.page";


export const TaskRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },

  {
    // TODO: adicionar o authGuard
    path: 'list',
    title: 'Listar de tarefas',
    component: ListPage,
    canActivate: [authGuard]
  }
];
