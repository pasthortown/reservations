import { AlojamientosComponent } from './alojamientos.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    component: AlojamientosComponent,
    data: {
      title: 'Inmuebles'
    }
  }
];

