import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  options = {};

  constructor(private http: HttpClient) {
    let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    this.options = {headers: headers};
  }

  upload_files(folder: string, files: any[]): Promise<any> {
    const data = {files: files};
    return this.http.post(environment.api_file + folder +'/upload_files', JSON.stringify(data), this.options).toPromise();
  }

  get_file(folder: string, file_id: string): Promise<any> {
    const data = {file_id: file_id};
    return this.http.post(environment.api_file + folder +'/get_file', JSON.stringify(data), this.options).toPromise();
  }

  delete_file(folder: string, file_id: string): Promise<any> {
    const data = {file_id: file_id};
    return this.http.post(environment.api_file + folder +'/delete_file', JSON.stringify(data), this.options).toPromise();
  }

  update_file(folder: string, file_id: string, file: any): Promise<any> {
    const data = {file_id: file_id, file: file};
    return this.http.post(environment.api_file + folder +'/update_file', JSON.stringify(data), this.options).toPromise();
  }
}
