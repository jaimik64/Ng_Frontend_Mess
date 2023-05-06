import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { OrderData } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent extends I18nService implements OnInit {

  orderData: OrderData = {
    _id: '',
    userid: '',
    meshid: '',
    addressid: '',
    payment: '',
    totalbill: 0,
    status: '',
    settled: false,
    dishes: [],
    MeshData: [],
    UserData: [],
    Address: [],
    DishDetails: [],
    createdAt: new Date()
  };

  constructor(private service: UserService, private snackbar: MatSnackBar, private router: Router) {
    super();

    if (this.service.selectedOrderHistory !== null) {
      this.orderData = this.service.selectedOrderHistory;

      this.orderData.dishes.forEach((dish) => {
        this.orderData.DishDetails.forEach((d) => {
          if (d._id === dish.dishId) {
            d.qty = dish.qty;
          }
        })
      })
    } else {
      this.router.navigateByUrl('/user/history');
    }
  }

  ngOnInit() {
  }

  back() {
    this.service.selectedOrderHistory = null;
    this.router.navigateByUrl('/user/history');
  }
}
