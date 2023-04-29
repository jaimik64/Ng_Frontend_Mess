import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { CartBottomSheetComponent } from '../dishes/dishes.component';
import { DishData, MessData } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends I18nService implements OnInit {
  messData: MessData[] = [];
  isBottomSheetOpened: boolean = false;
  cart: DishData[] = [];

  constructor(private service: UserService, private snackbar: MatSnackBar, private router: Router, private _bottomSheet: MatBottomSheet) {
    super();

    if (this.service.cart !== null) {
      this.cart = this.service.cart;
    }
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getMessDetails(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
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
    if (selectedMess._id !== this.service.selectedMess?._id) {
      this.service.isMessChanged = true;
      this.service.selectedMess = selectedMess;
    }
    this.router.navigateByUrl(`/user/dishes`);
  }

  openBottomSheet() {
    this.isBottomSheetOpened = true;
    this._bottomSheet.open(CartBottomSheetComponent, { disableClose: true, data: this.totalItemsCount() }).afterDismissed().subscribe(data => {
      this.isBottomSheetOpened = data.status;
    });
  }

  totalItemsCount() {
    return this.service.totalItemsCount();
  }
}
