import { Routes } from '@angular/router';
import { ReservasComponent } from './reservas.component';

export const routes: Routes = [
  {
    path: '',
    component: ReservasComponent,
    data: {
      title: 'Reservas'
    }
  }
];
