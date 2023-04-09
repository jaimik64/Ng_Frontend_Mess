import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { MessService } from '../mess.service';
import { UserProfile } from '../models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent extends I18nService implements OnInit {
  profileForm !: FormGroup;
  profileData!: UserProfile;

  constructor(private service: MessService, private snackBar: MatSnackBar, private formBuilder: FormBuilder, private router: Router) {
    super();

    this.profileForm = this.formBuilder.group({
      email: [{ value: '', disabled: true }, Validators.required],
      mobile: [{ value: '', disabled: true }, Validators.required],
      city: ['', Validators.required],
      location: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.service.getMessUserDetail(sessionStorage.getItem('userId') ?? '').subscribe(res => {
      this.profileData = res.data.mesh;
      console.log(this.profileData);
      this.profileForm.setValue({
        email: [this.profileData.email],
        mobile: this.profileData.mobile,
        city: this.profileData.city,
        location: this.profileData.location,
        name: this.profileData.name
      })
    })


    this.profileForm = this.formBuilder.group({
      email: [this.profileData.email ?? '', Validators.required],
      mobile: [this.profileData.mobile ?? '', Validators.required],
      city: [this.profileData.city, Validators.required],
      location: [this.profileData.location, Validators.required],
      name: [this.profileData.name, Validators.required]
    });
  }

  updateProfile() {
    this.service.updateProfile(sessionStorage.getItem('userId') ?? '', this.profileForm.value).subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.snackBar.open('Profile Updated', '', { duration: 2000 });
          this.router.navigate(['/mess/profile']);
        }
      }
    })
  }
}
