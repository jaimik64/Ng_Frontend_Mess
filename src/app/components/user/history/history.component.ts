import { Component, OnInit } from '@angular/core';
import { I18nService } from 'src/app/global-services/i18n.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.less']
})
export class HistoryComponent extends I18nService implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {

  }
}
