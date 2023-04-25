import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { DishData, MessData } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.less']
})
export class DishesComponent extends I18nService implements OnInit {

  cart: DishData[] = [];
  dishData: DishData[] = [];
  mess: MessData = {
    _id: '',
    name: '',
    email: '',
    mobile: '',
    location: '',
    city: ''
  }

  constructor(private service: UserService, private snackbar: MatSnackBar, private router: Router, private _bottomSheet: MatBottomSheet) {
    super();
    if (this.service.selectedMess === null) {
      this.snackbar.open('Please Select Mess', '', { verticalPosition: 'top', horizontalPosition: 'end', direction: 'ltr', duration: 2000 });
      this.router.navigateByUrl('/user');
    } else {
      this.mess = this.service.selectedMess;
    }

    if (this.service.cart !== null) {
      this.cart = this.service.cart;
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getDishDetailsByMessId(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.dishData = res.data;
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 2000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 2000 });
      }
    })
  }

  removeItem(dish: DishData) {
    this.service.removeItemFromCart(dish);
    this.cart = this.service.cart;
  }

  addItem(dish: DishData) {
    this.service.addItemInCart(dish, this.itemAvailableInCart(dish));
    this.cart = this.service.cart;
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
        count = count + data.qty
      }
    });

    return count;
  }

  openBottomSheet() {
    this._bottomSheet.open(CartBottomSheetComponent);
  }
}

@Component({
  selector: 'cart-details',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./dishes.component.less']
})
export class CartBottomSheetComponent extends I18nService implements OnInit {

  cartItems: DishData[] = [];

  constructor(private _bottomSheetRef: MatBottomSheetRef<CartBottomSheetComponent>, private service: UserService) {
    super()
  }

  ngOnInit(): void {
    this.cartItems = this.service.cart;
  }

  close() {
    this._bottomSheetRef.dismiss();
  }

  removeItem(dish: DishData) {
    this.service.removeItemFromCart(dish);
    this.cartItems = this.service.cart;
  }

  addItem(dish: DishData) {
    this.service.addItemInCart(dish, this.itemAvailableInCart(dish));
    this.cartItems = this.service.cart;
  }

  itemAvailableInCart(dish: DishData) {
    if (this.cartItems.length === 0) {
      return false;
    } else {
      let itemAdded: boolean = false;

      this.cartItems.forEach((item) => {
        if (item._id === dish._id) {
          itemAdded = true;
        }
      });
      return itemAdded;
    }
  }
}