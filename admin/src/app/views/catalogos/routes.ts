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
        path: 'propietarios',
        loadComponent: () => import('./propietarios/propietarios.component').then(m => m.PropietariosComponent),
        data: {
          title: 'Propietarios'
        }
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
      },
      {
        path: 'servicios',
        loadComponent: () => import('./servicios/servicios.component').then(m => m.ServiciosComponent),
        data: {
          title: 'Servicios'
        }
      },
      {
        path: 'condiciones',
        loadComponent: () => import('./condiciones/condiciones.component').then(m => m.CondicionesComponent),
        data: {
          title: 'Condiciones'
        }
      }
    ]
  }
];

