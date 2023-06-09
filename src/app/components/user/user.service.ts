import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddressData, AddressDataPayload, AddressResponse, CartCheckout, CreateRPOrderResponse, DishData, DishDataResponse, GenericResponse, MessData, MessDetailsResponse, OrderData, OrderResponse, Subscription, SubscriptionPayload, UserData, UserProfileResponse, validatePaymentPayload } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  messId: string = '';
  selectedMess: MessData | null = null;
  cart: DishData[] = [];
  isMessChanged: boolean = false;
  selectedAddress: AddressData | null = null;
  selectedSubscription: DishData | null = null;
  selectedOrderHistory: OrderData | null = null;
  selectedSubscriptionHistory: Subscription | null = null;

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

  subTotal() {
    let subTotal = 0;

    this.cart.forEach((data) => {
      if (data.qty !== undefined) {
        subTotal = subTotal + (data.qty * data.rate);
      }
    });

    return subTotal;
  }

  getAllAddresses(userId: string) {
    return this.http.get<AddressResponse>(`${environment.baseUrl}${environment.UserGetAddresses}/${userId}`);
  }

  updateAddress(userId: string, addressId: string, address: AddressDataPayload) {
    return this.http.put<GenericResponse>(`${environment.baseUrl}${environment.UserUpdateAddress}/${userId}/${addressId}`, address);
  }

  removeAddress(userId: string, addressId: string) {
    return this.http.delete<GenericResponse>(`${environment.baseUrl}${environment.UserRemoveAddress}/${userId}/${addressId}`);
  }

  addAddress(userId: string, address: AddressDataPayload) {
    return this.http.post<GenericResponse>(`${environment.baseUrl}${environment.UserAddAddress}/${userId}`, address);
  }

  createOrderInRP(userId: string, totalBill: number) {
    return this.http.post<CreateRPOrderResponse>(`${environment.baseUrl}${environment.UserCreateOrderInRP}/${userId}`, { totalbill: totalBill });
  }

  validatePayment(userId: string, payload: validatePaymentPayload) {
    return this.http.post<GenericResponse>(`${environment.baseUrl}${environment.UserValidatePayment}/${userId}`, { orderid: payload.orderid, signature: payload.signature, paymentid: payload.paymentid });
  }

  savePaymentDetails(userId: string, payload: validatePaymentPayload) {
    return this.http.post<GenericResponse>(`${environment.baseUrl}${environment.UserSavePayment}/${userId}`, payload);
  }

  createOrder(userId: string, cartCheckout: CartCheckout) {
    return this.http.post<GenericResponse>(`${environment.baseUrl}${environment.UserCreateOrder}/${userId}`, cartCheckout);
  }

  getSubscriptionByMess(userId: string) {
    return this.http.post<DishDataResponse>(`${environment.baseUrl}${environment.UserGetSubscriptionByMess}/${userId}/${this.selectedMess?._id}`, {});
  }

  buySubscription(userId: string, data: SubscriptionPayload) {
    return this.http.post<GenericResponse>(`${environment.baseUrl}${environment.UserBuySubcription}/${userId}`, data);
  }

  getAllOrders(userId: string) {
    return this.http.post<OrderResponse>(`${environment.baseUrl}${environment.UserGetAllOrders}/${userId}`, { id: userId });
  }

  getAllSubscriptions(userId: string) {
    return this.http.post<GenericResponse>(`${environment.baseUrl}${environment.UserGetSubscriptions}/${userId}`, {});
  }

  getUserDetails(userId: string) {
    return this.http.get<UserProfileResponse>(`${environment.baseUrl}${environment.UserProfile}/${userId}`);
  }

  updateUserProfile(userId: string, updatedData: UserData) {
    return this.http.put<GenericResponse>(`${environment.baseUrl}${environment.UpdateUserProfile}/${userId}`, updatedData);
  }

  updateOrder(orderId: string, userId: string, data: any) {
    return this.http.put<GenericResponse>(`${environment.baseUrl}${environment.UserUpdateOrder}/${userId}/${orderId}`, data);
  }
}
