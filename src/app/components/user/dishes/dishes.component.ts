import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
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
  isBottomSheetOpened: boolean = false;

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

  // TODO: Fix dish Details when it routed back to this component
  getData() {
    this.service.getDishDetailsByMessId(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          res.data.forEach((data) => {
            if (this.service.itemAvailableInCart(data)) {
              data.qty = this.service.dishData(data)?.qty;
            }
          });
          this.dishData = res.data;
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 2000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 2000 });
      }
    });
  }

  removeItem(dish: DishData) {
    this.service.removeItemFromCart(dish);
    this.cart = this.service.cart;
    this.dishData.forEach((data) => {
      if (this.service.itemAvailableInCart(data)) {
        data.qty = this.service.dishData(data)?.qty;
      }
    })
  }

  addItem(dish: DishData) {
    this.service.addItemInCart(dish);
    this.cart = this.service.cart;
    this.dishData.forEach((data) => {
      if (this.service.itemAvailableInCart(data)) {
        data.qty = this.service.dishData(data)?.qty;
      }
    })
  }

  itemAvailableInCart(dish: DishData) {
    return this.service.itemAvailableInCart(dish);
  }

  totalItemsCount() {
    return this.service.totalItemsCount();
  }

  openBottomSheet() {
    this.isBottomSheetOpened = true;
    this._bottomSheet.open(CartBottomSheetComponent, { disableClose: true, data: this.totalItemsCount() }).afterDismissed().subscribe(data => {
      this.isBottomSheetOpened = data.status;
    });
  }
}

@Component({
  selector: 'cart-details',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./dishes.component.less']
})
export class CartBottomSheetComponent extends I18nService implements OnInit {

  cartItems: DishData[] = [];
  totalItems: number = 0;

  constructor(private _bottomSheetRef: MatBottomSheetRef<CartBottomSheetComponent>, private service: UserService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.cartItems = this.service.cart;
  }

  totalItemsCount() {
    return this.service.totalItemsCount();
  }

  clearAll() {
    this.cartItems = [];
    this.service.cart = [];
    this.close();
  }

  close() {
    this._bottomSheetRef.dismiss({ status: false });
  }

  removeItem(dish: DishData) {
    this.service.removeItemFromCart(dish);
    this.cartItems = this.service.cart;
    if (this.totalItemsCount() === 0) {
      this.close();
    }
  }

  addItem(dish: DishData) {
    this.service.addItemInCart(dish);
    this.cartItems = this.service.cart;
  }

  itemAvailableInCart(dish: DishData) {
    return this.service.itemAvailableInCart(dish);
  }

  checkout() {
    this.close();
    this.router.navigateByUrl('/user/checkout');
  }
}