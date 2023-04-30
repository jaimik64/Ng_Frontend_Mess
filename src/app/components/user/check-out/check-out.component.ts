import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { AddressListComponent } from '../address-list/address-list.component';
import { AddressData, DishData, MessData } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.less']
})
export class CheckOutComponent extends I18nService implements OnChanges {

  mess: MessData = {
    _id: '',
    name: '',
    email: '',
    mobile: '',
    location: '',
    city: ''
  };
  cartItems: DishData[] = [];
  isBottomSheetOpened: boolean = false;
  selectedAddress: AddressData = {
    _id: '',
    name: '',
    mobile: '',
    pincode: '',
    address: '',
    city: ''
  }

  constructor(private service: UserService, private snackbar: MatSnackBar, private router: Router, private _bottomSheet: MatBottomSheet) {
    super();

    if (this.service.selectedMess !== null) {
      this.mess = this.service.selectedMess;
    } else {
      this.router.navigateByUrl('/user');
      this.snackbar.open('Please Add Dishes', '', { duration: 2000, verticalPosition: 'top' });
    }

    if (this.service.cart !== null) {
      this.cartItems = this.service.cart;
    }

    if (this.service.selectedAddress !== null) {
      this.selectedAddress = this.service.selectedAddress;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.service.selectedAddress !== null) {
      this.selectedAddress = this.service.selectedAddress;
      console.log(this.selectedAddress);
    }
  }

  removeItem(dish: DishData) {
    this.service.removeItemFromCart(dish);
    this.cartItems = this.service.cart;
  }

  addItem(dish: DishData) {
    this.service.addItemInCart(dish);
    this.cartItems = this.service.cart;
  }

  itemAvailableInCart(dish: DishData) {
    return this.service.itemAvailableInCart(dish);
  }

  totalItems() {
    if (this.service.totalItemsCount() === 0) {
      this.router.navigateByUrl('/user');
      return;
    } else {
      return this.service.totalItemsCount();
    }
  }

  addMore() {
    this.router.navigateByUrl('/user/dishes');
  }

  subTotalBill() {
    let subTotal = 0;

    this.cartItems.forEach((data) => {
      if (data.qty !== undefined) {
        subTotal = subTotal + (data.qty * data.rate);
      }
    });

    return subTotal;
  }

  openBottomSheet() {
    this.isBottomSheetOpened = true;

    this._bottomSheet.open(AddressListComponent, { disableClose: true }).afterDismissed().subscribe((data) => {
      this.isBottomSheetOpened = data.status;
      this.selectedAddress = data.selectedAddress;
    })
  }
}
