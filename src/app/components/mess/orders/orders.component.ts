import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { I18nService } from 'src/app/global-services/i18n.service';
import { LoaderService } from 'src/app/global-services/loader.service';
import { MessService } from '../mess.service';
import { DishDataInOrder, OrderData } from '../models';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrdersComponent extends I18nService implements OnInit {
  dataSource: MatTableDataSource<OrderData> = new MatTableDataSource();
  displayedColumns: string[] = ['orderBy', 'payment', 'totalbill', 'status', 'createdDate', 'settled', 'update'];
  displayedColumnsWithExpand: string[] = [...this.displayedColumns, 'expand']
  expandedElement: OrderData | null = null;
  dishDataSource: MatTableDataSource<DishDataInOrder> = new MatTableDataSource();
  dishColumns: string[] = ['dayname', 'isLunch', 'description', 'rate', 'qty', 'qtyRate'];
  orderStatus: { label: string, key: string }[] = [
    { label: "Placed", key: 'placed' },
    { label: "Preparing", key: 'preparing' },
    { label: "Out For Delivery", key: 'outfordelivery' },
    { label: "Delivered", key: 'delivered' },
  ]
  status: string = '';

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }
  constructor(private service: MessService, private snackbar: MatSnackBar) {
    super();
  }

  ngOnInit(): void {
    this.getOrdersByMessId()
  }

  getOrdersByMessId() {
    this.service.getOrdersByMessId(sessionStorage.getItem('userId') ?? '').subscribe(res => {
      this.dataSource.data = res.data;

    })
  }

  expandView(event: Event) {

    let length = this.expandedElement?.dishes.length ?? 0
    let dishes = this.expandedElement?.dishes;
    let dishDetails = this.expandedElement?.dishDetails;

    for (let i = 0; i < length; i++) {
      if (dishes !== undefined && dishDetails !== undefined) {
        if (dishes[i].dishId === dishDetails[i]._id) {
          dishDetails[i].qty = dishes[i].qty;
        }
      }
    }

    if (this.dishDataSource.data !== undefined && dishDetails !== undefined && length !== 0) {
      this.dishDataSource.data = dishDetails
    }

    if (length === 0) {
      this.dishDataSource.data = [];
    }
    event.stopPropagation();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateStatus(orderId: string, status: string) {
    this.service.updateOrder(sessionStorage.getItem('userId') ?? '', orderId, { status: status }).subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.getOrdersByMessId();
          this.snackbar.open('Order Status Updated', '', {
            duration: 2000
          })
        }
      },
      error: (err: HttpErrorResponse) => {

      }
    })
  }
}
