import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.less']
})
export class BottomNavComponent extends I18nService implements OnInit {

  constructor(public router: Router) {
    super();
  }

  ngOnInit(): void {
  }

}
