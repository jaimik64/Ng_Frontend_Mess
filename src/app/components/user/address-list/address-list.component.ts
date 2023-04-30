import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { I18nService } from 'src/app/global-services/i18n.service';
import Swal from 'sweetalert2';
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
    this.dialog.open(AddAddressComponent, { data: { isEdit: false, address: {} } });
    this.getAddressData();
  }

  updateAddress(address: AddressData) {
    this.close();
    this.dialog.open(AddAddressComponent, { data: { isEdit: true, address: address } });
    this.getAddressData();
  }

  confirm(address: AddressData) {
    Swal.fire({
      text: `Are you sure, You want to remove ${address.name}'s address?`,
      title: 'Are you Sure?',
      icon: 'warning',
      confirmButtonText: 'Confirm',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAddress(address);
      }
    })
  }

  deleteAddress(address: AddressData) {
    this.service.removeAddress(sessionStorage.getItem('userId') ?? '', address._id).subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.snackbar.open('Address Removed', '', { duration: 2000 });
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 2000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 2000 });
      }
    });
    this.getAddressData();
  }
}
