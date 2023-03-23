import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

  authForm!: FormGroup;
  hide: boolean = true
  nextForm: boolean = false
  confHide: boolean = true
  disableNextBtn: boolean = false

  constructor(private formBuilder: FormBuilder, private service: AuthService, private router: Router, private snackBar: MatSnackBar) {
    if (localStorage.getItem('token') !== null) {
      router.navigate(['/home'])
    }
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: [null, Validators.required],
      confirm: [null, Validators.required]
    })
  }

  passwordValidator() {
    return this.authForm.get('password')?.value === this.authForm.get('confirm')?.value
  }

  signup() {
    this.disableNextBtn = true
    this.service.signup(this.authForm.value).subscribe((res: any) => {
      if (res.meta.errorCode === 0) {
        this.snackBar.open(res.meta.message, 'Ok', {
          verticalPosition: 'top'
        })
        this.router.navigate(['/home'])
      } else {
        this.snackBar.open(res.meta.message, 'Ok', {
          verticalPosition: 'top'
        })
      }
    })
  }

  next() {
    this.nextForm = !this.nextForm
  }


}
