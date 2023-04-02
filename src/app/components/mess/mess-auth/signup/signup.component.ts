import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { MessService } from '../../mess.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less']
})
export class SignupComponent extends I18nService implements OnInit {
  authForm!: FormGroup;
  hide: boolean = true
  nextForm: boolean = false
  showForm: number = 0
  confHide: boolean = true
  disableNextBtn: boolean = false
  locationInfo: boolean = true

  constructor(private formBuilder: FormBuilder, private service: MessService, private router: Router, private snackBar: MatSnackBar) {
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
      confirm: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
      location: ['', Validators.required],
      city: ['', Validators.required],
      delivery: [true, Validators.required]
    }, {
      validators: this.passwordValidator.bind(this)
    });
  }

  prev() {
    if (this.showForm === 0) {
      return
    }
    this.showForm = this.showForm - 1
  }

  passwordValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const conf = formGroup.get('confirm');

    return password?.value === conf?.value ? null : { passwordNotMatch: true }
  }

  signup() {
    this.disableNextBtn = true
    console.log(this.authForm.value);

    this.service.signup(this.authForm.value).subscribe((res: any) => {
      if (res.meta.errorCode === 0) {
        this.snackBar.open(res.meta.message, 'Ok', {
          verticalPosition: 'top'
        })
        this.router.navigate(['/mesh/login'])
      } else {
        this.snackBar.open(res.meta.message, 'Ok', {
          verticalPosition: 'top'
        })
      }
    })
  }

  next() {
    if (this.showForm === 2) {
      return
    }

    this.showForm = this.showForm + 1
  }

}
