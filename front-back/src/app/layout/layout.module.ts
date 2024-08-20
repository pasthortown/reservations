import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../services/auth.service';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    LoginComponent,
    SigninComponent,
    ProfileComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    LayoutRoutingModule,
    FormsModule
  ],
  providers: [
    AuthService
  ]
})
export class LayoutModule { }
