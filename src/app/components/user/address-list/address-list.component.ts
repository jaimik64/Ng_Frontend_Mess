import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { I18nService } from 'src/app/global-services/i18n.service';
import { AddressData } from '../models';
import { UserService } from '../user.service';
import { AddAddressComponent } from './add-address/add-address.component';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.less']
})
export class AddressListComponent extends I18nService implements OnInit {

  addresses: AddressData[] = [];

  constructor(private service: UserService, private _bottomSheetRef: MatBottomSheetRef<AddressListComponent>, private dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.getAddressData();
  }

  getAddressData() {
    this.service.getAllAddresses(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        console.log(res);
        this.addresses = res.data;
      },
      error: (err: HttpErrorResponse) => {

      }
    })
  }

  close() {
    this._bottomSheetRef.dismiss({ status: false });
  }

  addAddress() {
    this.dialog.open(AddAddressComponent, { data: { isEdit: false } });
  }

  updateAddress() {
    this.dialog.open(AddAddressComponent, { data: { isEdit: true } });
  }
}
