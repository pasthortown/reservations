import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @Output('submit') submitEmitter: EventEmitter<any> = new EventEmitter();
  @Input('alert') alert: any = { messages: [] };

  data: any = {
    email: '',
    password: ''
  };

  submit(action: string) {
    this.data.action = action;
    this.submitEmitter.emit(this.data);
  }
}
