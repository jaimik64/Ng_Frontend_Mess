import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { I18nService } from 'src/app/global-services/i18n.service';
import { DishData } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.less']
})
export class SubscriptionListComponent extends I18nService implements OnInit {

  subscriptionList: DishData[] = [];
  constructor(private service: UserService, private snackbar: MatSnackBar) {
    super();
  }

  ngOnInit(): void {
    this.getSubscriptionData();
  }

  getSubscriptionData() {
    this.service.getSubscriptionByMess(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.subscriptionList = res.data;
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 3000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 3000 });

      }
    })
  }

  selectSubscription(data: DishData) {
    this.service.selectedSubscription = data;
  }
}
