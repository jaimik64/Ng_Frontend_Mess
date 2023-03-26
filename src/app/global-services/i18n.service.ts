import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  viewLanguage: string = 'en';
  jsonData: any = {};


  constructor() {
    this.viewLanguage = localStorage.getItem('ln') ?? 'en';
    this.loadData()
  }

  async loadData() {
    await import('src/assets/translations/' + this.viewLanguage + '.json').then(data => {
      this.jsonData = data
    })
  }

  i18n(key: string): string {
    return this.jsonData[key] ?? (key);
  }

  setLocale(locale: string) {
    this.viewLanguage = locale;
    localStorage.setItem('ln', locale)
    this.loadData();
    console.log("Locale Language Updated to ", this.viewLanguage);
  }
}
