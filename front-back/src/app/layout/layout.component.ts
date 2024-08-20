import { Component, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  @ViewChild('content_profile') content_profile: any;
  @ViewChild('content_login') content_login: any;
  modal_login: NgbModalRef | undefined;
  modal_profile: NgbModalRef | undefined;
  user: any = null;
  alert_login: any = { messages: [] };

  constructor(private modalService: NgbModal, private authService: AuthService) {}

  profile() {
    this.modal_profile = this.modalService.open(this.content_profile, { centered: true, size: 'xl', backdrop: 'static', keyboard: false });
  }

  login() {
    this.modal_login = this.modalService.open(this.content_login, { centered: true, size: 'xl', backdrop: 'static', keyboard: false });
  }

  do_login(data: any) {
    if (data.action == 'password_recovery') {
      this.authService.recovery(data.email).then( r => {
        if (r.status == 200) {
          sessionStorage.clear();
          this.alert_login.messages = [];
          if (this.modal_login) {
            this.modal_login.close();
          }
        } else {
          sessionStorage.clear();
          this.alert_login.messages = [];
          this.alert_login.messages.push(r.response);
        }
      }).catch( e => console.log(e) );
    }
    if (data.action == 'login') {
      this.authService.login(data.email, data.password).then( r => {
        if (r.status == 200) {
          this.user = r.userdata;
          sessionStorage.setItem('token', r.token as string);
          sessionStorage.setItem('rol', this.user.rol as string);
          this.alert_login.messages = [];
          if (this.modal_login) {
            this.modal_login.close();
          }
        } else {
          sessionStorage.clear();
          this.alert_login.messages = [];
          this.alert_login.messages.push(r.response);
        }
      }).catch( e => console.log(e) );
    }
  }

  do_signin(data: any) {
    let user: any = data;
    user.rol = 'Client';
    delete user.password_confirm;
    this.authService.register(user);
    if (this.modal_login) {
      this.modal_login.close();
    }
  }

  do_update_user(data: any) {
    let user = data;
    delete user.password_confirm;
    delete user._id;
    this.authService.update_user_data(user.item_id, user);
    this.logout();
    if (this.modal_profile) {
      this.modal_profile.close();
    }
  }

  logout() {
    this.user = null;
    sessionStorage.clear();
  }
}
