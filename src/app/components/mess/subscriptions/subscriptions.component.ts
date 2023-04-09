import { Component, OnInit, ViewChild } from '@angular/core';
import { I18nService } from 'src/app/global-services/i18n.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MessService } from '../mess.service';
import { MatTableDataSource } from '@angular/material/table';
import { SubscriptionData } from '../models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.less'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SubscriptionsComponent extends I18nService implements OnInit {
  displayedColumns: string[] = ['name', 'fees', 'toDate', 'fromDate', 'paymentId', 'settled', 'expand'];
  dataSource: MatTableDataSource<SubscriptionData> = new MatTableDataSource();
  expandedElement: SubscriptionData | null = null;

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }

  constructor(private service: MessService, private snackbar: MatSnackBar, private router: Router) {
    super();
    if (sessionStorage.getItem('userId') === undefined) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
    this.getSubscriptionsByMessId()
  }

  getSubscriptionsByMessId() {
    this.service.getSubscriptionsByMessId(sessionStorage.getItem('userId') ?? '').subscribe(res => {
      if (res.meta.errorCode === 0) {
        this.dataSource.data = res.data;
      }
    })
  }

  expandView(event: Event) {

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
