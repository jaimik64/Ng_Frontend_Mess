import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, loginData } from '../auth.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  authForm!: FormGroup;
  hide: boolean = true;
  userDetails: loginData = {
    email: '',
    password: ''
  }

  constructor(private formBuilder: FormBuilder, private service: AuthService, private snackBar: MatSnackBar, private router: Router) {
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
