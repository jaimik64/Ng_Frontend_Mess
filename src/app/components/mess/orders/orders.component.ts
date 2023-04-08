import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { I18nService } from 'src/app/global-services/i18n.service';
import { MessService } from '../mess.service';
import { Order } from '../models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent extends I18nService implements OnInit {
  dataSource: MatTableDataSource<Order> = new MatTableDataSource();
  displayedColumns: string[] = ['dayname', 'isLunch', 'description', 'rate', 'id'];


  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }
  constructor(private service: MessService, private dialog: MatDialog, private snackbar: MatSnackBar) {
    super()
  }

  ngOnInit(): void {
    this.getOrdersByMessId()
  }

  getOrdersByMessId() {
    this.service.getOrdersByMessId(sessionStorage.getItem('userId') ?? '').subscribe(res => {
      console.log(res);
    })
  }
}
