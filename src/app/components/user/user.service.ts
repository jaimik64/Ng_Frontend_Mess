import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DishData, DishDataResponse, GenericResponse, MessData, MessDetailsResponse } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  messId: string = '';
  selectedMess: MessData | null = null;
  cart: DishData[] = [];

  constructor(private http: HttpClient) { }

  getMessDetails(userId: string) {
    return this.http.get<MessDetailsResponse>(`${environment.baseUrl}${environment.UserGetMessDetails}/${userId}`);
  }

  getDishDetailsByMessId(userId: string) {
    return this.http.get<DishDataResponse>(`${environment.baseUrl}${environment.UserGetDishesByMessId}/${userId}/${this.selectedMess?._id}`);
  }

  addItemInCart(dish: DishData, itemAdded: boolean) {

    if (itemAdded) {
      this.cart.forEach(data => {
        if (data._id === dish._id) {
          if (data.qty !== undefined) {
            data.qty = data.qty + 1;
          }
        }
      })
    } else {
      dish.qty = 1;
      this.cart?.push(dish);
    }

    console.log(this.cart);

  }

  removeItemFromCart(dish: DishData) {

    if (dish.qty !== undefined) {

      if (dish.qty > 1) {
        this.cart.filter((data) => {
          if (data._id === dish._id) {
            if (data.qty !== undefined) {
              data.qty = data.qty - 1;
            }
          }
        });
      } else {
        let temp = this.cart.filter((data) => {
          return data._id !== dish._id;
        });
        this.cart = temp;
      }
    }
    console.log(this.cart);

  }

}
