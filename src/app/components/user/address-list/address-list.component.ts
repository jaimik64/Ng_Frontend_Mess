import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  selectedAddress: AddressData = {
    _id: '',
    name: '',
    mobile: '',
    pincode: '',
    address: '',
    city: ''
  }

  constructor(private service: UserService, private _bottomSheetRef: MatBottomSheetRef<AddressListComponent>, private dialog: MatDialog, private snackbar: MatSnackBar) {
    super();

    if (this.service.selectedAddress !== null) {
      this.selectedAddress = this.service.selectedAddress;
    }
  }

  ngOnInit() {
    this.getAddressData();
  }

  selectAddress(address: AddressData) {
    this.service.selectedAddress = address;
    this.selectedAddress = this.service.selectedAddress;
  }

  getAddressData() {
    this.service.getAllAddresses(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.addresses = res.data;
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 2000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 2000 });
      }
    })
  }

  close() {
    this._bottomSheetRef.dismiss({ status: false, selectedAddress: this.selectedAddress });
  }

  addAddress() {
    this.close();
    this.dialog.open(AddAddressComponent, { data: { isEdit: false } });
  }

  updateAddress() {
    this.dialog.open(AddAddressComponent, { data: { isEdit: true } });
  }
}
