import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { I18nService } from 'src/app/global-services/i18n.service';
import { AdminService } from '../admin.service';
import { DishData, Dishes } from '../models';

@Component({
  selector: 'app-manage-dish',
  templateUrl: './manage-dish.component.html',
  styleUrls: ['./manage-dish.component.less']
})
export class ManageDishComponent extends I18nService implements OnInit {

  dataSource: MatTableDataSource<DishData> = new MatTableDataSource();
  displayedColumns: string[] = ['']

  constructor(private service: AdminService, private snackbar: MatSnackBar) {
    super();
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getDishDetails(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.dataSource.data = res.data;
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 2000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 2000 });
      }
    })
  }
}
