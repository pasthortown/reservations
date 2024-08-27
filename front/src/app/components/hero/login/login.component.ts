import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './../../../services/auth.service';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, FormFloatingDirective, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService],
  imports: [CommonModule, FormFloatingDirective, HttpClientModule, FormsModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output('login_done') login_done: EventEmitter<any> = new EventEmitter();
  isScreenSmOrLarger: boolean = true;
  opcion = 'login';
  data: any = { email: '', password: '', fullname: '', identification: '', phone_number: '', borndate: '1986-09-15' };

  constructor(private authService: AuthService, private router: Router) {
    this.isScreenSmOrLarger = window.innerWidth > 1200;
  }

  signin() {
    this.authService.register(this.data).then( r => {
      if (r.status == 200) {
        this.login();
      } else {
        sessionStorage.clear();
        this.data = { email: '', password: '', fullname: '', identification: '', phone_number: '', borndate: '1986-09-15' };
      }
    }).catch( e => console.log(e) );
  }

  login() {
    this.authService.login(this.data.email, this.data.password).then( r => {
      if (r.status == 200) {
        sessionStorage.setItem('user', JSON.stringify(r.userdata) as string);
        sessionStorage.setItem('token', r.token as string);
        this.data = { email: '', password: '', fullname: '', identification: '', phone_number: '', borndate: '1986-09-15' };
        this.login_done.emit(true);
      } else {
        sessionStorage.clear();
        this.data = { email: '', password: '', fullname: '', identification: '', phone_number: '', borndate: '1986-09-15' };
      }
    }).catch( e => console.log(e) );
  }

  password_recovery() {
    this.authService.recovery(this.data.email).then( r => {
      if (r.status == 200) {
        sessionStorage.clear();
      } else {
        sessionStorage.clear();
      }
    }).catch( e => console.log(e) );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isScreenSmOrLarger = (event.target as Window).innerWidth > 1200; // Actualiza el valor al cambiar el tamaño de la ventana
  }
}
