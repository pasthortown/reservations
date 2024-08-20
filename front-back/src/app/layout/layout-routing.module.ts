import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from './components/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m=>m.HomeModule)
     },
     {
        path: 'admin',
        canActivate: [AuthGuard],
        loadChildren: () => import('./admin/admin.module').then(m=>m.AdminModule)
     },
     {
        path: 'not-found',
        loadChildren: () => import('./not-found-page/not-found-page.module').then(m=>m.NotFoundPageModule)
      },
      {
        path: '**',
        redirectTo: 'not-found'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class LayoutRoutingModule { }
