import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, loginData } from 'src/app/components/auth/auth.service';
import { navList } from 'src/app/components/shared/navbar/nav-list';
import { MessService } from '../../mess.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  authForm!: FormGroup;
  hide: boolean = true;
  userDetails: loginData = {
    email: '',
    password: ''
  }

  constructor(private formBuilder: FormBuilder, private service: MessService, private snackBar: MatSnackBar, private router: Router) {
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
        localStorage.setItem('role', res.data.user.role)

        let role = localStorage.getItem('role');

        if (role === "0") {
          localStorage.setItem("Menu", JSON.stringify(navList.menu[0].menuList))
        } else if (role === "1") {
          localStorage.setItem("Menu", JSON.stringify(navList.menu[1].menuList))
        } else {
          localStorage.setItem("Menu", JSON.stringify(navList.menu[2].menuList))
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
}
