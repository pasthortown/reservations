import { UsersComponent } from './users.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Usuarios'
    }
  }
];
