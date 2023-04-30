import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddressData, AddressResponse, DishData, DishDataResponse, GenericResponse, MessData, MessDetailsResponse } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  messId: string = '';
  selectedMess: MessData | null = null;
  cart: DishData[] = [];
  isMessChanged: boolean = false;
  selectedAddress: AddressData | null = null;

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

  getAllAddresses(userId: string) {
    return this.http.get<AddressResponse>(`${environment.baseUrl}${environment.UserGetAddresses}/${userId}`);
  }

  updateAddress(userId: string, addressId: string) {
    // TODO: Add Address Data
    return this.http.put<GenericResponse>(`${environment.baseUrl}${environment.UserUpdateAddress}/${userId}/${addressId}`, {});
  }

  removeAddress(userId: string, addressId: string) {
    return this.http.delete<GenericResponse>(`${environment.baseUrl}${environment.UserRemoveAddress}/${userId}/${addressId}`);
  }

  addAddress(userId: string) {
    return this.http.post<GenericResponse>(`${environment.baseUrl}${environment.UserAddAddress}/${userId}`, {});
  }
}
