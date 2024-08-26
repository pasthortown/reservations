import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  options = {};

  constructor(private http: HttpClient) {
    let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    this.options = {headers: headers};
  }

  build_headers() {
    let headers: HttpHeaders = new HttpHeaders().set('token', sessionStorage.getItem('token') as string);
    this.options = {headers: headers};
  }

  login(email: string, password: string): Promise<any> {
    const data = {email: email, password: password};
    return this.http.post(environment.api_auth + 'login', JSON.stringify(data)).toPromise();
  }

  recovery(email: any): Promise<any>{
    const data = {email: email};
    return this.http.post(environment.api_auth + 'recovery', JSON.stringify(data)).toPromise();
  }

  register(user: any): Promise<any>{
    const data = {userdata: user, email: user.email};
    return this.http.post(environment.api_auth + 'register', JSON.stringify(data)).toPromise();
  }

  update_user_data(item_id: string, userdata: any): Promise<any>{
    this.build_headers();
    const data = {item_id: item_id, userdata: userdata};
    return this.http.post(environment.api_auth + 'admin/users/update_user_data', JSON.stringify(data), this.options).toPromise();
  }

  get_user(item_id: string, output_model: any): Promise<any>{
    this.build_headers();
    const data = {item_id: item_id, output_model: output_model};
    return this.http.post(environment.api_auth + 'admin/users/get_user', JSON.stringify(data), this.options).toPromise();
  }

  get_users(output_model: any): Promise<any>{
    this.build_headers();
    const data = {output_model: output_model};
    return this.http.post(environment.api_auth + 'admin/users/get_users', JSON.stringify(data), this.options).toPromise();
  }

  lock_user(item_id: string): Promise<any>{
    this.build_headers();
    const data = {item_id: item_id};
    return this.http.post(environment.api_auth + 'admin/users/lock_user', JSON.stringify(data), this.options).toPromise();
  }

  unlock_user(item_id: string): Promise<any>{
    this.build_headers();
    const data = {item_id: item_id};
    return this.http.post(environment.api_auth + 'admin/users/unlock_user', JSON.stringify(data), this.options).toPromise();
  }
}
