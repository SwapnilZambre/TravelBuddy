import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enironments/env';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  constructor() {}

  baseUrl: string = environment.apiBaseUrl;

  getUserList() {
    return this.http.get(`${this.baseUrl}Traveller`);
  }

  createUser(data: any) {
    return this.http.post(`${this.baseUrl}Traveller`, data);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}Traveller/${id}`);
  }

  updateUser(id: number, data: any) {
    return this.http.put(`${this.baseUrl}Traveller/${id}`, data);
  }

  verifyMail(body: any) {
    return this.http.post(`${this.baseUrl}Otp/send`, body);
  }

  verifyOtp(body: any) {
    return this.http.post(`${this.baseUrl}Otp/verify`, body);
  }
}
