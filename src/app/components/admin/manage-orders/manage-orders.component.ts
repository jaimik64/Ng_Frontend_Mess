import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { expand } from 'rxjs';
import { I18nService } from 'src/app/global-services/i18n.service';
import Swal from 'sweetalert2';
import { AdminService } from '../admin.service';
import { DishData, OrderData } from '../models';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class ManageOrdersComponent extends I18nService implements OnInit {

  dataSource: MatTableDataSource<OrderData> = new MatTableDataSource();
  displayedColumns: string[] = ['orderId', 'date', 'paymentId', 'totalbill', 'status', 'settled'];
  displayedColumnsWithExpand: string[] = [...this.displayedColumns, 'expand'];
  expandedElement: OrderData | null = null;
  dishDataSource: MatTableDataSource<DishData> = new MatTableDataSource();
  dishColumns: string[] = ['dayname', 'isLunch', 'description', 'rate', 'qty', 'qtyRate'];
  totalSettleAmount: number = 0;

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }

  constructor(private service: AdminService, private snackbar: MatSnackBar) {
    super();
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getOrderDetails(sessionStorage.getItem('userId') ?? '').subscribe({
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

  expandView(event: Event) {
    let length = this.expandedElement?.dishes.length ?? 0;
    let dishes = this.expandedElement?.dishes;
    let dishDetails = this.expandedElement?.DishDetails;

    for (let i = 0; i < length; i++) {
      if (dishes !== undefined && dishDetails !== undefined) {
        if (dishes[i].dishId === dishDetails[i]._id) {
          dishDetails[i].qty = dishes[i].qty;
        }
      }
    }

    if (this.dishDataSource.data !== undefined && dishDetails !== undefined && length !== 0) {
      this.dishDataSource.data = dishDetails;
    } else {
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

  getUnsettledOrders() {
    this.service.unsettledOrderList(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          res.data.forEach((data) => {
            this.totalSettleAmount = this.totalSettleAmount + data.total;
          });
          this.confirmSettlement();
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 3000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 3000 });
      }
    })
  }

  confirmSettlement() {
    let x = this.totalSettleAmount.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers != '')
      lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    Swal.fire({
      text: `₹ ${res} will be settled to mess.`,
      title: 'Are you Sure?',
      icon: 'warning',
      confirmButtonText: 'Confirm',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.settleOrders();
      }
    })
  }

  settleOrders() {
    this.service.settleOrders(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.snackbar.open('Successfully settled orders', '', { duration: 3000 });
          this.getData();
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 3000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 3000 });
      }
    })
  }
}
