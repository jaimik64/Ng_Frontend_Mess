import { Component } from '@angular/core';
import { I18nService } from 'src/app/global-services/i18n.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.less']
})
export class LanguageComponent extends I18nService {

  lan: string = localStorage.getItem('ln') ?? 'en';

  constructor() {
    super();
  }

  setLanguage() {
    this.setLocale(this.lan);
  }
}
