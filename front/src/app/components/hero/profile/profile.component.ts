import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './../../../services/auth.service';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, FormFloatingDirective, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  providers: [AuthService],
  imports: [CommonModule, FormFloatingDirective, HttpClientModule, FormsModule, ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, NgStyle],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  data: any = { item_id: '', email: '', password: '', password_confirm: '', fullname: '', identification: '', phone_number: '', borndate: '1986-09-15' };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.data = JSON.parse(sessionStorage.getItem('user') as string);
    this.data.password = '';
    this.data.password_confirm = '';
  }

  update_profile() {
    let new_user_data = { email: this.data.email, password: this.data.password, fullname: this.data.fullname, identification: this.data.identification, phone_number: this.data.phone_number, borndate: this.data.borndate };
    this.authService.update_user_data(this.data.item_id, new_user_data).then( r => {
      if (r.status == 200) {
        this.data = { email: '', password: '', password_confirm: '', fullname: '', identification: '', phone_number: '', borndate: '1986-09-15' };
      }
    }).catch( e => console.log(e) );
  }
}
