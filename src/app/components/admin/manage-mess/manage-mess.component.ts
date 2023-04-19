import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { I18nService } from 'src/app/global-services/i18n.service';
import Swal from 'sweetalert2';
import { AdminService } from '../admin.service';
import { MessUserData } from '../models';

@Component({
  selector: 'app-manage-mess',
  templateUrl: './manage-mess.component.html',
  styleUrls: ['./manage-mess.component.less']
})
export class ManageMessComponent extends I18nService implements OnInit {

  dataSource: MatTableDataSource<MessUserData> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'email', 'mobile', 'address', 'city', 'createdAt', 'action'];

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
    this.service.getMessDetails(sessionStorage.getItem('userId') ?? '').subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.dataSource.data = res.data.meshes;
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 2000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 2000 });
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  confirmationBox(refUser: MessUserData) {
    Swal.fire({
      text: `${refUser.name} Mess  will be removed`,
      title: 'Warning',
      icon: 'warning',
      confirmButtonText: 'Confirm',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeMess(refUser._id);
      }
    })

  }

  removeMess(refUserId: string) {

    this.service.removeMess(sessionStorage.getItem('userId') ?? '', refUserId).subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.snackbar.open('Mess Removed', '', { duration: 2000 });
          this.getData();
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
