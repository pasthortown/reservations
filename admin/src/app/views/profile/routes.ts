import { ProfileComponent } from './profile.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: {
      title: 'Cuenta'
    }
  }
];

