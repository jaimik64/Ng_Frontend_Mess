import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddressDataResponse, DishDataResponse, GenericResponse, MessDataResponse, MessUserData, OrderDataResponse, SubscriptionDataResponse, UserdataResponse } from './models';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getDishDetails(userId: string) {
    this.http.get<DishDataResponse>(`${environment.baseUrl}${environment.adminGetDishes}/${userId}`);
  }

  getOrderDetails(userId: string) {
    this.http.get<OrderDataResponse>(`${environment.baseUrl}${environment.adminGetOrders}/${userId}`);
  }

  getSubscriptionDetails(userId: string) {
    this.http.get<SubscriptionDataResponse>(`${environment.baseUrl}${environment.adminGetSubscriptions}/${userId}`);
  }

  getAddressDetails(userId: string) {
    return this.http.get<AddressDataResponse>(`${environment.baseUrl}${environment.adminGetAddresses}/${userId}`);
  }

  getUsersDetails(userId: string) {
    return this.http.get<UserdataResponse>(`${environment.baseUrl}${environment.adminGetUsers}/${userId}`);
  }

  getMessDetails(userId: string) {
    return this.http.get<MessDataResponse>(`${environment.baseUrl}${environment.adminGetMess}/${userId}`);
  }

  updateUserRole(userId: string, refUserId: string, role: number) {
    return this.http.put<GenericResponse>(`${environment.baseUrl}${environment.adminUpdateRole}/${refUserId}/${userId}`, { role });
  }

  removeUser(userId: string, refUserId: string) {
    return this.http.delete<GenericResponse>(`${environment.baseUrl}${environment.adminRemoveUser}/${refUserId}/${userId}`, {});
  }

  removeMess(userId: string, refUserId: string) {
    return this.http.delete<GenericResponse>(`${environment.baseUrl}${environment.adminRemoveMess}/${refUserId}/${userId}`, {});
  }

  settleOrders(userId: string) {
    return this.http.post<GenericResponse>(`${environment.baseUrl}${environment.adminSettleOrders}/${userId}`, {});
  }

  settleSubscriptions(userId: string) {
    return this.http.post<GenericResponse>(`${environment.baseUrl}${environment.adminSettleSubscriptions}/${userId}`, {})
  }
}
