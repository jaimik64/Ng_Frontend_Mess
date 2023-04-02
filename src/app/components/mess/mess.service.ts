import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { signupData, loginData } from '../auth/auth.service';
import { addDishPayload } from './models';

export interface GenericResponse {
  meta: { errorCode: number, message: string },
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class MessService {
  constructor(private http: HttpClient) { }

  login(data: loginData) {
    return this.http.post<GenericResponse>(`${environment.baseUrl}${environment.messLogin}`, data)
  }

  signup(data: signupData) {
    return this.http.post<GenericResponse>(`${environment.baseUrl}${environment.messSignup}`, data)
  }

  logout() {
    return this.http.get<GenericResponse>(`${environment.baseUrl}${environment.messLogout}`)
  }

  getDishDetailsByMessId(userId: string) {
    return this.http.get<GenericResponse>(`${environment.baseUrl}${environment.getDishesByMessId}/${userId}`)
  }

  getOrdersByMessId(userId: string) {
    return this.http.post<GenericResponse>(`${environment.baseUrl}${environment.getOrdersByMessID}/${userId}`, {})
  }

  getSubscriptionsByMessId(userId: string) {
    return this.http.get<GenericResponse>(`${environment.baseUrl}${environment.getSubscriptionsByMessId}/${userId}`)
  }

  getMessUserDetail(userId: string) {
    return this.http.get<GenericResponse>(`${environment.baseUrl}${environment.getMessUserDetail}/${userId}`)
  }

  addDish(data: addDishPayload) {
    return this.http.post<GenericResponse>(`${environment.baseUrl}${environment.addDishByMess}/${data.meshuser}`, data)
  }
}
