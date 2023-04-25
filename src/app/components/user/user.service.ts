import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DishDataResponse, GenericResponse, MessData, MessDetailsResponse } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  messId: string = '';
  selectedMess: MessData | null = null;

  constructor(private http: HttpClient) { }

  getMessDetails(userId: string) {
    return this.http.get<MessDetailsResponse>(`${environment.baseUrl}${environment.UserGetMessDetails}/${userId}`);
  }

  getDishDetailsByMessId(userId: string) {
    return this.http.get<DishDataResponse>(`${environment.baseUrl}${environment.UserGetDishesByMessId}/${userId}/${this.selectedMess?._id}`);
  }
}
