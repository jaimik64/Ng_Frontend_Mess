import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { DishData, MessData } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.less']
})
export class CheckOutComponent extends I18nService implements OnInit {

  mess: MessData = {
    _id: '',
    name: '',
    email: '',
    mobile: '',
    location: '',
    city: ''
  };
  cartItems: DishData[] = [];

  constructor(private service: UserService, private snackbar: MatSnackBar, private router: Router) {
    super();

    if (this.service.selectedMess !== null) {
      this.mess = this.service.selectedMess;
    } else {
      // this.router.navigateByUrl('/user');
      // this.snackbar.open('Please Add Dishes', '', { duration: 2000, verticalPosition: 'top' });
    }

    if (this.service.cart !== null) {
      this.cartItems = this.service.cart;
    }
  }

  ngOnInit() {

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
}
