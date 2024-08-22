import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Catálogos'
    },
    children: [
      {
        path: '',
        redirectTo: 'catalogos',
        pathMatch: 'full'
      },
      {
        path: 'zonas',
        loadComponent: () => import('./zonas/zonas.component').then(m => m.ZonasComponent),
        data: {
          title: 'Zonas'
        }
      },
      {
        path: 'precios',
        loadComponent: () => import('./precios/precios.component').then(m => m.PreciosComponent),
        data: {
          title: 'Precios'
        }
      }
    ]
  }
];

