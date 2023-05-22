import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, loginData } from '../auth.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { navList } from '../../shared/navbar/nav-list';
import { I18nService } from 'src/app/global-services/i18n.service';

export interface languageSelector {
  type: string;
  label: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends I18nService implements OnInit {
  authForm!: FormGroup;
  hide: boolean = true;
  userDetails: loginData = {
    email: '',
    password: ''
  }
  languages: languageSelector[] = [
    {
      type: 'en',
      label: 'English'
    },
    {
      type: 'hn',
      label: 'Hindi'
    },
  ]
  selectedLan: string = localStorage.getItem('ln') ?? ''

  constructor(private formBuilder: FormBuilder, private service: AuthService, private snackBar: MatSnackBar, private router: Router) {
    super()
    if (localStorage.getItem('token') !== null) {
      router.navigate(['/home'])
    }
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      userId: ['', Validators.email],
      password: ['', Validators.required]
    })
  }

  login() {
    this.userDetails.email = this.authForm.get('userId')?.value
    this.userDetails.password = this.authForm.get('password')?.value

    this.service.login(this.userDetails).subscribe((res: any) => {
      if (res.meta.errorCode === 0) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('role', res.data.user.role);
        sessionStorage.setItem('userId', res.data.user._id);
        sessionStorage.setItem('userName', res.data.user.name);

        let role = localStorage.getItem('role');

        if (role === "0") {
          localStorage.setItem("Menu", JSON.stringify(navList.menu[0].menuList))
        } else if (role === "1") {
          localStorage.setItem("Menu", JSON.stringify(navList.menu[2].menuList))
        } else {
          localStorage.setItem("Menu", JSON.stringify(navList.menu[1].menuList))
        }

        this.snackBar.open('Successfully Logged In!!', 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
        this.router.navigate(['/home'])
      } else {
        this.snackBar.open(res.meta.message, 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      }
    })
  }

  changeLan() {
    this.setLocale(this.selectedLan)
  }
}
