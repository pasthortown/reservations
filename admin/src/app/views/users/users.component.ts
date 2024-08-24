import { AuthService } from './../../../../../front-back/src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ButtonCloseDirective,
  ButtonDirective,
  ColComponent,
  RowComponent,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalTitleDirective,
  ModalToggleDirective,
  TextColorDirective,
  ThemeDirective,
  TableDirective,
  TableColorDirective,
  TableActiveDirective,
  BorderDirective,
  AlignDirective,
  PaginationComponent,
  PageItemComponent,
  PageLinkDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonGroupComponent,
  ButtonToolbarComponent,
  FormFloatingDirective,
  FormDirective,
  FormSelectDirective,
  FormLabelDirective
} from '@coreui/angular';

import { IconDirective } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers:[AuthService],
  imports: [ CommonModule, FormFloatingDirective, FormDirective, FormSelectDirective, FormsModule, ButtonGroupComponent, ButtonToolbarComponent, IconDirective, HttpClientModule, InputGroupComponent, InputGroupTextDirective, FormControlDirective, FormLabelDirective, PaginationComponent, PageItemComponent, PageLinkDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, TextColorDirective, ThemeDirective, ButtonCloseDirective, ButtonDirective, ColComponent, RowComponent, ModalComponent, ModalHeaderComponent, ModalTitleDirective, ModalBodyComponent, ModalFooterComponent, ModalToggleDirective, RouterLink]
})
export class UsersComponent {
  filter = '';
  users: any[] = [];
  users_shown: any[] = [];
  user_selected = {
    item_id: '',
    fullname: '',
    identification: '',
    phone_number: '',
    borndate: '',
    email: '',
    rol: '',
    login_tries: '',
    active: '',
    disabled: ''
  };
  public visible = false;
  is_new = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.get_users();
  }

  get_users() {
    this.users = [];
    this.user_selected = {
      item_id: '',
      fullname: '',
      identification: '',
      phone_number: '',
      borndate: '',
      email: '',
      rol: '',
      login_tries: '',
      active: '',
      disabled: ''
    };
    let output_model: any = {
      fullname: true,
      identification: true,
      phone_number: true,
      borndate: true,
      email: true,
      rol: true,
      login_tries: true,
      active: true,
      disabled: true
    };
    this.authService.get_users(output_model).then( r => {
      this.users = r.response;
      this.filterData();
    }).catch( e => console.log(e) );
  }

  new_item() {
    this.user_selected = {
      item_id: '',
      fullname: '',
      identification: '',
      phone_number: '',
      borndate: '',
      email: '',
      rol: '',
      login_tries: '',
      active: '',
      disabled: ''
    };
    this.is_new = true;
  }

  filterData() {
    const lowerCaseFilter = this.filter.toLowerCase();
    this.users_shown = this.users.filter(user =>
      Object.values(user).some((value: any) =>
        value.toString().toLowerCase().includes(lowerCaseFilter)
      )
    );
  }

  cancelar() {
    this.visible = !this.visible;
    this.get_users();
  }

  handleChange(event: any) {
    this.visible = event;
  }

  edit_user_data() {
    this.update_item(this.user_selected);
    this.visible = !this.visible;
  }

  update_item(item: any) {
    this.authService.update_user_data(item.item_id, item).then(r => {
      this.get_users();
    }).catch( e => console.log(e) );
  }

  change_lock_state() {
    if (this.user_selected.disabled) {
      this.authService.unlock_user(this.user_selected.item_id).then(r => {
        this.get_users();
      }).catch( e => console.log(e) );
    }
    if (!this.user_selected.disabled) {
      this.authService.lock_user(this.user_selected.item_id).then(r => {
        this.get_users();
      }).catch( e => console.log(e) );
    }
  }
}
