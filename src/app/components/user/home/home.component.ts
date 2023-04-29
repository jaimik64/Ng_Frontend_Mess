import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { MessData } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends I18nService implements OnInit {
  messData: MessData[] = [];

  constructor(private service: UserService, private snackbar: MatSnackBar, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getMessDetails(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          console.log(res);
          this.messData = res.data;
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 2000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 2000 });
      }
    })
  }

  call(mess: MessData) {
    open(`tel:${mess.mobile}`)
  }

  viewDishes(selectedMess: MessData) {
    this.service.selectedMess = selectedMess;
    this.service.isMessChanged = true;
    this.router.navigateByUrl(`/user/dishes`);
  }
}
