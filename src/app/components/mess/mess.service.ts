import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { signupData, loginData } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class MessService {

  constructor(private http: HttpClient) { }

  login(data: loginData) {
    return this.http.post(`${environment.baseUrl}${environment.messLogin}`, data)
  }

  signup(data: signupData) {
    return this.http.post(`${environment.baseUrl}${environment.messSignup}`, data)
  }

  logout() {
    return this.http.get(`${environment.baseUrl}${environment.messLogout}`)
  }
}
