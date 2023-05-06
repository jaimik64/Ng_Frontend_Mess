import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { Subscription } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.less']
})
export class SubscriptionsComponent extends I18nService implements OnInit {

  subscriptionData: Subscription = {
    _id: '',
    fees: 0,
    toDate: new Date(),
    fromDate: new Date(),
    userId: '',
    meshId: '',
    addressId: '',
    dishId: '',
    paymentId: '',
    settled: false,
    meshData: [],
    dishData: [],
    addressData: [],
    createdAt: new Date()
  }

  constructor(private service: UserService, private snackbar: MatSnackBar, private router: Router) {
    super();

    if (this.service.selectedSubscriptionHistory !== null) {
      this.subscriptionData = this.service.selectedSubscriptionHistory;
    } else {
      this.router.navigateByUrl('/user/history')
    }
  }

  ngOnInit() {
  }

  back() {
    this.service.selectedSubscriptionHistory = null;
    this.router.navigateByUrl('/user/history');
  }
}
