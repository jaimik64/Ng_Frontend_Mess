import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent extends I18nService implements OnInit {
  // password and confirm password must be match
  authForm!: FormGroup;
  hide: boolean = true
  nextForm: boolean = false
  confHide: boolean = true
  disableNextBtn: boolean = false

  error_msg: any = {
    'name': [
      {
        type: 'required',
        message: 'User name is required'
      }
    ],

    'email': [
      { type: 'required', message: 'Please enter a valid email address' }
    ],
    'mobile': [
      { type: 'required', message: 'Mobile No. is required' },
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', message: 'Password must be 8 Letters or more' },
      { type: 'maxLength', message: 'Password must be 16 Letters or less' }
    ],
    'confirm': [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', message: 'Password must be 8 Letters or more' },
      { type: 'maxLength', message: 'Password must be 16 Letters or less' }
    ]
  }


  constructor(private formBuilder: FormBuilder, private service: AuthService, private router: Router, private snackBar: MatSnackBar) {
    super()
    if (localStorage.getItem('token') !== null) {
      router.navigate(['/home'])
    }
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]{10}')])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
      confirm: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])]
    }, {
      validators: this.passwordValidator.bind(this)
    });
  }

  passwordValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const conf = formGroup.get('confirm');

    return password?.value === conf?.value ? null : { passwordNotMatch: true }
  }

  signup() {
    this.disableNextBtn = true

    let req = {
      name: this.authForm.get('name')?.value,
      email: this.authForm.get('email')?.value.toLowerCase(),
      mobile: this.authForm.get('mobile')?.value,
      password: this.authForm.get('password')?.value,
      confirm: this.authForm.get('confirm')?.value
    }

    this.service.signup(req).subscribe((res: any) => {
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
