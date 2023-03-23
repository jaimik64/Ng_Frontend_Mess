import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface loginData{
  email: string;
  password: string
}

export interface signupData{
  name: string;
  email: string;
  password: string;
  mobile: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  login(data: loginData) {
    return this.http.post(`${environment.baseUrl}${environment.login}`,data)
  }

  logout() {
    return this.http.get(`${environment.baseUrl}${environment.logout}`)
  }

  signup(data: signupData) {
    return this.http.post(`${environment.baseUrl}${environment.signup}`, data)
  }
}
