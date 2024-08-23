import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    providers: [AuthService],
    imports: [HttpClientModule, FormsModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle]
})
export class LoginComponent {

  data: any = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.data.email, this.data.password).then( r => {
      if (r.status == 200) {
        sessionStorage.setItem('user', JSON.stringify(r.userdata) as string);
        sessionStorage.setItem('token', r.token as string);
        this.router.navigate(['/dashboard']);
      } else {
        sessionStorage.clear();
        this.data = { email: '', password: '' };
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

}
