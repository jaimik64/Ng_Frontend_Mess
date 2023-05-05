import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { I18nService } from 'src/app/global-services/i18n.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.less']
})
export class SubscriptionsComponent extends I18nService implements OnInit {

  constructor(private service: UserService, private snackbar: MatSnackBar) {
    super();
  }

  ngOnInit() {
    this.getSubscriptionData();
  }

  getSubscriptionData() {
    this.service.getAllSubscriptions(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          console.log(res.data);
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 3000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 3000 });
      }
    })
  }
}
