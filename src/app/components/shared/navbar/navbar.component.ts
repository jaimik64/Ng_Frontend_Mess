import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { navContent, navList } from './nav-list';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent {
  isExpanded: boolean = false;
  searchText: string = '';
  filteredData: any[] = []

  constructor(private router: Router, private snackBar: MatSnackBar) {
    this.filteredData = JSON.parse(localStorage.getItem('Menu') ?? '')
  }

  filterPages() {

  }

  logout() {
    localStorage.clear()
    this.snackBar.open('Logged Out', 'Ok', {
      verticalPosition: 'top'
    })
    this.router.navigate(['/'])
  }
}
