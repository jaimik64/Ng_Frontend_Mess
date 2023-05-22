import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { navContent, navList } from './nav-list';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent extends I18nService {
  isExpanded: boolean = false;
  searchText: string = '';
  filteredData: any[] = [];
  lan: string = localStorage.getItem('ln') ?? 'en';
  userName: string = sessionStorage.getItem('userName') ?? 'User';
  role: string = localStorage.getItem('role') ?? 0 === 0 ? 'User' : 'Admin';

  constructor(private router: Router, private snackBar: MatSnackBar) {
    super();

    this.filteredData = JSON.parse(localStorage.getItem('Menu') ?? '')
  }

  logout() {
    localStorage.clear()
    this.snackBar.open('Logged Out', 'Ok', {
      verticalPosition: 'top', duration: 3000
    })
    this.router.navigate(['/'])
  }

  setLanguage() {
    this.setLocale(this.lan);
  }
}
