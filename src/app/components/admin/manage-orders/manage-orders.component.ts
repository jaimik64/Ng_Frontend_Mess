import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { expand } from 'rxjs';
import { I18nService } from 'src/app/global-services/i18n.service';
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
          console.log(res.data);

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
}
