import { Component, OnInit, ViewChild } from '@angular/core';
import { I18nService } from 'src/app/global-services/i18n.service';
import { MessService } from '../mess.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { dish } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { AddDishComponent } from './add-dish/add-dish.component';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.less']
})
export class DishesComponent extends I18nService implements OnInit {

  dataSource: MatTableDataSource<dish> = new MatTableDataSource()
  displayedColumns: string[] = ['dayname', 'isLunch', 'description', 'rate']

  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort
  }

  constructor(private service: MessService, private dialog: MatDialog) {
    super()
  }

  ngOnInit(): void {
    this.getDishes()
  }

  getDishes() {
    this.service.getDishDetailsByMessId(sessionStorage.getItem('userId') ?? '').subscribe(res => {
      this.dataSource.data = res.data
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addDish() {
    const dialogRef = this.dialog.open(AddDishComponent, {
      height: '75%',
      width: '90%'
    })

    dialogRef.afterClosed().subscribe(() => this.getDishes())
  }
}
