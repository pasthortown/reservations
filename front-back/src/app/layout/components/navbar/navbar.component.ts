import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  is_logged: boolean = false;
  user_name: string = "Iniciar Sesión";
  @Output('loginEmitter') loginEmitter: EventEmitter<any> = new EventEmitter();
  @Output('logoutEmitter') logoutEmitter: EventEmitter<any> = new EventEmitter();
  @Output('profileEmitter') profileEmitter: EventEmitter<any> = new EventEmitter();
  @Input('user') user: any = null;
  rol: any = 'Client';

  ngOnChanges() {
    this.is_logged = !(this.user == null)
    if (this.is_logged) {
      this.rol = this.user.rol;
    } else {
      this.rol = 'Client';
    }
  }

  login() {
    this.loginEmitter.emit(true);
  }

  logout() {
    this.logoutEmitter.emit(true);
  }

  profile() {
    this.profileEmitter.emit(true);
  }
}
