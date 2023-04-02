import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { I18nService } from 'src/app/global-services/i18n.service';
import { MessService } from '../../mess.service';
import { addDishPayload, dishType } from '../../models';

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
  ]
  payload: addDishPayload = {
    dayname: '',
    rate: 0,
    description: '',
    isLunch: 0,
    meshuser: sessionStorage.getItem('userId') ?? ''
  }
  authForm !: FormGroup;

  constructor(private service: MessService, private snackBar: MatSnackBar, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddDishComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    super()
  }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      dayname: ['', Validators.required],
      rate: [0, Validators.required],
      description: ['', Validators.required],
      isLunch: [0, Validators.required],
    })
  }

  addDish() {

    this.payload = {
      dayname: this.authForm.get('dayname')?.value,
      isLunch: this.authForm.get('isLunch')?.value,
      description: this.authForm.get('description')?.value,
      rate: this.authForm.get('rate')?.value,
      meshuser: sessionStorage.getItem('userId') ?? ''
    }
    this.service.addDish(this.payload).subscribe(res => {
      if (res.meta.errorCode === 0) {
        this.snackBar.open('Dish Added', 'Ok', { duration: 2000 })
        this.dialogRef.close()
      } else {
        this.snackBar.open(res.meta.message, 'Try Again', { duration: 2000 })
      }
    })

  }
}
