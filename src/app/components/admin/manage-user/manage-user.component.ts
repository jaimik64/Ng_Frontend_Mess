import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { I18nService } from 'src/app/global-services/i18n.service';
import Swal from 'sweetalert2';
import { AdminService } from '../admin.service';
import { UserData, userRoleDropDown } from '../models';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.less']
})
export class ManageUserComponent extends I18nService implements OnInit {

  dataSource: MatTableDataSource<UserData> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'email', 'mobile', 'role', 'createdAt', 'update'];
  userOptions: userRoleDropDown[] = [
    {
      key: 0,
      label: 'User'
    },
    {
      key: 1,
      label: 'Admin'
    }
  ]


  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }

  constructor(private service: AdminService, private snackbar: MatSnackBar) {
    super();
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.service.getUsersDetails(sessionStorage.getItem('userId') ?? '').subscribe(
      res => {
        if (res.meta.errorCode === 0) {
          this.dataSource.data = res.data;
        }
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updateRole(data: UserData) {
    if (sessionStorage.getItem('userId') !== data._id) {
      this.service.updateUserRole(sessionStorage.getItem('userId') ?? '', data._id, data.role).subscribe(
        {
          next: res => {
            if (res.meta.errorCode === 0) {
              data.updateRole = false;
              this.getUsers();
            } else {
              this.snackbar.open(res.meta.message, '', { duration: 3000 });
            }
          },
          error: (err: HttpErrorResponse) => {
            this.snackbar.open(err.error.meta.message, '', { duration: 3000 });
          }
        })
    } else {
      this.snackbar.open('You can not change your own role', '', { duration: 3000 });
    }
  }

  confirmationBox(refUser: UserData) {
    Swal.fire({
      text: `${refUser.name} user will be removed`,
      title: 'Warning',
      icon: 'warning',
      confirmButtonText: 'Confirm',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {
        this.removeUser(refUser._id);
      }
    })
  }

  removeUser(refUserId: string) {
    if (sessionStorage.getItem('userId') !== refUserId) {
      this.service.removeUser(sessionStorage.getItem('userId') ?? '', refUserId).subscribe(
        res => {
          if (res.meta.errorCode === 0) {
            this.getUsers();
            this.snackbar.open(res.meta.message, '', { duration: 3000 });
          } else {
            this.snackbar.open(res.meta.message, '', { duration: 3000 });
          }
        }
      )
    } else {
      this.snackbar.open('You can not delete your account', '', { duration: 3000 });
    }
  }
}
