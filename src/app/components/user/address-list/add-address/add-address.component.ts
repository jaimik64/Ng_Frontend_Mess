import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';
import { I18nService } from 'src/app/global-services/i18n.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.less']
})
export class AddAddressComponent extends I18nService implements OnInit {

  isEdit: boolean = false;

  constructor(private service: UserService, private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddAddressComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  ngOnInit() {

  }

  addAddress() {

  }

  updateAddress() {

  }
}
