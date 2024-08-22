import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Alojamientos'
    },
    children: [
      {
        path: '',
        redirectTo: 'alojamientos',
        pathMatch: 'full'
      },
      {
        path: 'administrar',
        loadComponent: () => import('./administrar/administrar.component').then(m => m.AdministrarComponent),
        data: {
          title: 'Administrar'
        }
      }
    ]
  }
];

