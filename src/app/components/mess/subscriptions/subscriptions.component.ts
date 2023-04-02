import { Component, OnInit } from '@angular/core';
import { I18nService } from 'src/app/global-services/i18n.service';
import { MessService } from '../mess.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.less']
})
export class SubscriptionsComponent extends I18nService implements OnInit {

  constructor(private service: MessService) {
    super()
  }

  ngOnInit(): void {
    this.getSubscriptionsByMessId()
  }

  getSubscriptionsByMessId() {
    this.service.getSubscriptionsByMessId(sessionStorage.getItem('userId') ?? '').subscribe(res => {
      console.log(res);

    })
  }
}
