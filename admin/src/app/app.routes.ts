import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { AuthGuard } from './../components/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/profile/routes').then((m) => m.routes)
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/users/routes').then((m) => m.routes)
      },
      {
        path: 'alojamientos',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/alojamientos/routes').then((m) => m.routes)
      },
      {
        path: 'catalogos',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/catalogos/routes').then((m) => m.routes)
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  { path: '**', redirectTo: '404' }
];
