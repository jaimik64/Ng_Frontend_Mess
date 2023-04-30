import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';
import { I18nService } from 'src/app/global-services/i18n.service';
import { AddressData, AddressDataPayload } from '../../models';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.less']
})
export class AddAddressComponent extends I18nService implements OnInit {

  isEdit: boolean = false;
  title: string = '';
  addressForm !: FormGroup;
  address !: AddressData;

  constructor(private service: UserService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddAddressComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private snackbar: MatSnackBar) {
    super();
    this.isEdit = data.isEdit;
    this.address = data.address;
    if (this.isEdit) {
      this.title = 'Edit'
    } else {
      this.title = 'Add'
    }
  }

  ngOnInit() {
    this.onLoadValidations();
  }

  onLoadValidations() {
    if (this.isEdit) {
      this.addressForm = this.formBuilder.group({
        name: [this.address.name, Validators.required],
        mobile: [this.address.mobile, Validators.required],
        address: [this.address.address, Validators.required],
        city: [this.address.city, Validators.required],
        pincode: [this.address.pincode, Validators.required]
      })
    } else {
      this.addressForm = this.formBuilder.group({
        name: ['', Validators.required],
        mobile: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
        pincode: ['', Validators.required]
      })
    }
  }

  addAddress() {

    let addAddressPayload: AddressDataPayload = {
      name: this.addressForm.get('name')?.value,
      mobile: this.addressForm.get('mobile')?.value,
      address: this.addressForm.get('address')?.value,
      city: this.addressForm.get('city')?.value,
      pincode: this.addressForm.get('pincode')?.value,
      user: sessionStorage.getItem('userId') ?? ''
    }

    this.service.addAddress(sessionStorage.getItem('userId') ?? '', addAddressPayload).subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.snackbar.open(res.meta.message, '', { duration: 2000 });
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 2000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 2000 });
      }
    });
    this.dialogClose();
  }

  updateAddress() {
    let updateAddressPayload: AddressDataPayload = {
      name: this.addressForm.get('name')?.value,
      mobile: this.addressForm.get('mobile')?.value,
      address: this.addressForm.get('address')?.value,
      city: this.addressForm.get('city')?.value,
      pincode: this.addressForm.get('pincode')?.value,
      user: sessionStorage.getItem('userId') ?? ''
    }

    this.service.updateAddress(sessionStorage.getItem('userId') ?? '', this.address._id, updateAddressPayload).subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.snackbar.open('Address Updated', '', { duration: 2000 });
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 2000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 2000 });
      }
    });

    this.dialogClose();
  }

  dialogClose() {
    this.dialogRef.close();
  }
}
