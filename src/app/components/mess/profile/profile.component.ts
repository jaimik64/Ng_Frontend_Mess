import { Component, OnInit } from '@angular/core';
import { I18nService } from 'src/app/global-services/i18n.service';
import { MessService } from '../mess.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent extends I18nService implements OnInit {
  constructor(private service: MessService) {
    super()
  }

  ngOnInit() {
    this.getProfile()
  }

  getProfile() {
    this.service.getMessUserDetail(sessionStorage.getItem('userId') ?? '').subscribe(res => {
      console.log(res);

    })
  }
}
