import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { OrderData, Subscription } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent extends I18nService implements OnInit {

  orderData: OrderData[] = [];
  subscriptionData: Subscription[] = [];

  constructor(private service: UserService, private snackbar: MatSnackBar, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.getOrderData();
    this.getSubscriptionData();
  }

  getOrderData() {
    this.service.getAllOrders(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.orderData = res.data;
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 3000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 3000 });
      }
    })
  }


  getSubscriptionData() {
    this.service.getAllSubscriptions(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.subscriptionData = res.data;
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 3000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 3000 });
      }
    })
  }

  selectOrder(data: OrderData) {
    this.service.selectedOrderHistory = data;
    this.router.navigateByUrl('/user/order');
  }

  selectSubscription(data: Subscription) {
    this.service.selectedSubscriptionHistory = data;
    this.router.navigateByUrl('/user/subcription');
  }

  getSubscriptionStatus(data: Subscription) {
    let today = new Date();
    let startDate = new Date(data.toDate);
    let endDate = new Date(data.fromDate);

    return today > startDate && today < endDate ? 'Active' : today < startDate ? 'Will Start' : 'Completed';
  }
}

