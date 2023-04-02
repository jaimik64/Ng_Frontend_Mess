import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { loginData } from 'src/app/components/auth/auth.service';
import { languageSelector } from 'src/app/components/auth/login/login.component';
import { navList } from 'src/app/components/shared/navbar/nav-list';
import { I18nService } from 'src/app/global-services/i18n.service';
import { MessService } from '../../mess.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends I18nService {
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


  constructor(private formBuilder: FormBuilder, private service: MessService, private snackBar: MatSnackBar, private router: Router) {
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
        localStorage.setItem('Menu', JSON.stringify(navList.menu[1].menuList))

        this.snackBar.open('Successfully Logged In!!', 'Ok', {
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
        this.router.navigate(['/mess/home'])
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
