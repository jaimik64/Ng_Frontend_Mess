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
  isMessChanged: boolean = false;

  constructor(private http: HttpClient) { }

  getMessDetails(userId: string) {
    return this.http.get<MessDetailsResponse>(`${environment.baseUrl}${environment.UserGetMessDetails}/${userId}`);
  }

  getDishDetailsByMessId(userId: string) {
    return this.http.get<DishDataResponse>(`${environment.baseUrl}${environment.UserGetDishesByMessId}/${userId}/${this.selectedMess?._id}`);
  }

  addItemInCart(dish: DishData) {
    if (this.isMessChanged) {
      this.cart = [];
      dish.qty = 1;
      this.cart?.push(dish);
      this.isMessChanged = false
    } else {
      if (this.itemAvailableInCart(dish)) {
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

  itemAvailableInCart(dish: DishData) {
    if (this.cart.length === 0) {
      return false;
    } else {
      let itemAdded: boolean = false;

      this.cart.forEach((item) => {
        if (item._id === dish._id) {
          itemAdded = true;
        }
      });
      return itemAdded;
    }
  }

  totalItemsCount() {
    let count = 0;

    this.cart.forEach((data) => {
      if (data.qty !== undefined) {
        count = count + data.qty;
      }
    });

    return count;
  }

  dishData(dish: DishData) {
    for (let i = 0; i < this.cart.length; i++) {
      if (dish._id === this.cart[i]._id) {
        return this.cart[i];
      }
    }
    return;
  }
}
