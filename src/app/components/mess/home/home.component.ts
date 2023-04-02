import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends I18nService implements OnInit {

  constructor(private router: Router) {
    super()
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') === undefined) {
      this.router.navigate(['/mess/auth'])
    }
  }
}
