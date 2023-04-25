import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { DishData, MessData } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.less']
})
export class DishesComponent extends I18nService implements OnInit {

  dishData: DishData[] = [];
  mess: MessData = {
    _id: '',
    name: '',
    email: '',
    mobile: '',
    location: '',
    city: ''
  }

  constructor(private service: UserService, private snackbar: MatSnackBar, private router: Router) {
    super();
    if (this.service.selectedMess === null) {
      this.snackbar.open('Please Select Mess', '', { verticalPosition: 'top', horizontalPosition: 'end', direction: 'ltr', duration: 2000 });
      this.router.navigateByUrl('/user');
    } else {
      this.mess = this.service.selectedMess;
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getDishDetailsByMessId(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.dishData = res.data;
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 2000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 2000 });
      }
    })
  }
}
