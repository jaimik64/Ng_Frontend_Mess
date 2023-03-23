import { Component } from '@angular/core';
import { LoaderService } from 'src/app/global-services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent {
  loading: boolean = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe((v: boolean) => {
      this.loading = v;
    })
  }
}
