import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { LanguageComponent } from '../../shared/language/language.component';
import { AddressListComponent } from '../address-list/address-list.component';
import { UserData } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent extends I18nService implements OnInit {

  userProfile: UserData = {
    _id: '',
    name: '',
    mobile: '',
    email: '',
    role: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
  userForm !: FormGroup;
  isBottomSheetOpened: boolean = false;

  constructor(private service: UserService, private snackbar: MatSnackBar, private formBuilder: FormBuilder, private _bottomSheet: MatBottomSheet, private router: Router) {
    super();
    this.userForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }, Validators.required],
      mobile: [{ value: '', disabled: true }, Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    this.service.getUserDetails(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.userProfile = res.data;
          this.userForm = this.formBuilder.group({
            email: [{ value: res.data.email, disabled: true }, Validators.required],
            mobile: [{ value: res.data.mobile, disabled: true }, Validators.required],
            name: [res.data.name, Validators.required]
          });
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 3000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 3000 });
      }
    })
  }

  updateProfileData() {
    this.userProfile = this.userForm.value;

    this.service.updateUserProfile(sessionStorage.getItem('userId') ?? '', this.userProfile).subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          console.log(res);
          this.getProfileData();
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 3000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 3000 });
      }
    })
  }

  openAddressBook() {
    this.isBottomSheetOpened = true;
    this._bottomSheet.open(AddressListComponent, {
      disableClose: true
    }).afterDismissed().subscribe((data) => {
      this.isBottomSheetOpened = false;
    })
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/');
  }

  switchToAdmin() {
    this.router.navigateByUrl('/home');
  }

  chooseLanguage() {
    this.isBottomSheetOpened = true;

    this._bottomSheet.open(LanguageComponent, {}).afterDismissed().subscribe((data) => {
      this.isBottomSheetOpened = false;
    })
  }
}
