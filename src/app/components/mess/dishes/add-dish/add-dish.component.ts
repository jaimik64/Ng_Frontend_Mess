import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { I18nService } from 'src/app/global-services/i18n.service';
import { MessService } from '../../mess.service';
import { addDishPayload, dish, dishType, updateDishPayload } from '../../models';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.less']
})
export class AddDishComponent extends I18nService implements OnInit {

  day: string[] = ['All Day', 'Subscription', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  dishType: dishType[] = [
    { label: 'Lunch', value: 0 },
    { label: 'Dinner', value: 1 },
    { label: 'Lunch and Dinner', value: 2 }
  ];
  title: string = '';
  add: boolean = false;
  addDishpayload: addDishPayload = {
    dayname: '',
    rate: 0,
    description: '',
    isLunch: 0,
    meshuser: sessionStorage.getItem('userId') ?? ''
  };
  updateDishPayload !: updateDishPayload;
  dishData!: dish;
  authForm !: FormGroup;

  constructor(private service: MessService, private snackBar: MatSnackBar, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddDishComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.title = data.title;
    this.add = data.add;
    this.dishData = data.dish;
  }

  ngOnInit(): void {
    this.onLoadValidations();
  }

  onLoadValidations() {
    if (this.add) {
      this.authForm = this.formBuilder.group({
        dayname: ['', Validators.required],
        rate: [0, Validators.required],
        description: ['', Validators.required],
        isLunch: [0, Validators.required],
      });
    } else {
      this.authForm = this.formBuilder.group({
        dayname: [this.dishData.dayname, Validators.required],
        rate: [this.dishData.rate, Validators.required],
        description: [this.dishData.description, Validators.required],
        isLunch: [this.dishData.isLunch, Validators.required]
      })
    }
  }

  dialogClose() {
    this.dialogRef.close();
  }

  addDish() {

    this.addDishpayload = {
      dayname: this.authForm.get('dayname')?.value,
      isLunch: this.authForm.get('isLunch')?.value,
      description: this.authForm.get('description')?.value,
      rate: this.authForm.get('rate')?.value,
      meshuser: sessionStorage.getItem('userId') ?? ''
    }
    this.service.addDish(this.addDishpayload).subscribe(res => {
      if (res.meta.errorCode === 0) {
        this.snackBar.open('Dish Added', 'Ok', { duration: 2000 })
        this.dialogRef.close();
      } else {
        this.snackBar.open(res.meta.message, 'Try Again', { duration: 2000 })
      }
    })
  }

  updateDish() {
    this.updateDishPayload = {
      dayname: this.authForm.get('dayname')?.value,
      isLunch: this.authForm.get('isLunch')?.value,
      description: this.authForm.get('description')?.value,
      rate: this.authForm.get('rate')?.value
    }

    this.service.updateDish(sessionStorage.getItem('userId') ?? '', this.dishData._id, this.updateDishPayload).subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.snackBar.open('Dish Updated', '', { duration: 2000 });
          this.dialogRef.close();
        } else {
          this.snackBar.open(res.meta.message, '', { duration: 2000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.error.meta.message, '', { duration: 2000 });
      }
    })
  }

  performAction() {
    if (this.add) {
      this.addDish();
    } else {
      this.updateDish();
    }
  }
}
