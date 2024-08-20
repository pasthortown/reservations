import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Output('submit') submitEmitter: EventEmitter<any> = new EventEmitter();
  @Input('user') data: any = {
    fullname: '',
    identification: '',
    phone_number: '',
    borndate: '',
    email: '',
    password: '',
    password_confirm: ''
  };

  alert: any = {
    messages: []
  };

  constructor() {
    this.do_validations();
  }

  ngOnChanges() {
    this.do_validations();
  }

  do_validations() {
    if (this.data.password === undefined) {
      this.data.password = '';
      this.data.password_confirm = '';
    }
    this.alert.messages = [];
    if (this.data.password != this.data.password_confirm) {
      this.alert.messages.push('Las contraseñas no coinciden');
    }
    if (this.data.password == '') {
      this.alert.messages.push('Debe ingresar una clave');
    }
    if (this.data.fullname == '' ||
        this.data.identification == '' ||
        this.data.phone_number == '' ||
        this.data.email == ''
    ) {
      this.alert.messages.push('Todos los campos son requeridos');
    }

    const borndate = new Date(this.data.borndate);
    const today = new Date();
    if (isNaN(borndate.getTime())) {
      this.alert.messages.push('Debe ingresar una fecha de nacimiento válida');
      return;
    }
    const age = today.getFullYear() - borndate.getFullYear();
    const monthDifference = today.getMonth() - borndate.getMonth();
    const dayDifference = today.getDate() - borndate.getDate();
    if (
      age < 18 ||
      (age === 18 && monthDifference < 0) ||
      (age === 18 && monthDifference === 0 && dayDifference < 0)
    ) {
      this.alert.messages.push('Debe tener al menos 18 años para crear una cuenta');
    }
  }

  submit() {
    this.do_validations();
    if (this.alert.messages.length == 0) {
      this.submitEmitter.emit(this.data);
    }
  }
}
