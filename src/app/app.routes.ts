import { Routes } from '@angular/router';
import {AppRoot} from "./app.root";
import {TaskRoutes} from "./features/task/tasks.routes";

export const routes: Routes = [
  {
    path: '',
    loadChildren: ()=> import("./features/users/users.routes").then(m=>m.UserRoutes)
  },
  {
    path: 'task',
    loadChildren: ()=> import("./features/task/tasks.routes").then(m=>m.TaskRoutes)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
