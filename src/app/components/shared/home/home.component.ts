import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, OnChanges {
  constructor(private router: Router) {

    if (localStorage.getItem('token') === null) {
      router.navigate(['/'])
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) {
      this.router.navigate(['/'])
    }
  }
}
