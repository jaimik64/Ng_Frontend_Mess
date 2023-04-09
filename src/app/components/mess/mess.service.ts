import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { signupData, loginData } from '../auth/auth.service';
import { addDishPayload, GenericResponse, OrderDetailsRes, updateDishPayload } from './models';


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
    return this.http.post<OrderDetailsRes>(`${environment.baseUrl}${environment.getOrdersByMessID}/${userId}`, { messId: userId })
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

  deleteDish(messId: string, dishId: string) {
    return this.http.delete<GenericResponse>(`${environment.baseUrl}${environment.deleteDishByMess}/${messId}/${dishId}`)
  }

  updateDish(messId: string, dishId: string, body: updateDishPayload) {
    return this.http.put<GenericResponse>(`${environment.baseUrl}${environment.updateDishByMess}/${messId}/${dishId}`, body)
  }

  updateOrder(messId: string, orderId: string, body: any) {
    return this.http.put<GenericResponse>(`${environment.baseUrl}${environment.updateOrderStatus}/${messId}/${orderId}`, body)
  }

}
