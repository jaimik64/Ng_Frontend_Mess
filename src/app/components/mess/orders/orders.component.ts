import { Component, OnInit } from '@angular/core';
import { I18nService } from 'src/app/global-services/i18n.service';
import { MessService } from '../mess.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent extends I18nService implements OnInit {

  constructor(private service: MessService) {
    super()
  }

  ngOnInit(): void {
    this.getOrdersByMessId()
  }

  getOrdersByMessId() {
    this.service.getOrdersByMessId(sessionStorage.getItem('userId') ?? '').subscribe(res => {
      console.log(res);
    })
  }
}
