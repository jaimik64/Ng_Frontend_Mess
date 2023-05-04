import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

function _window() {
  return window;
}

@Injectable({
  providedIn: 'root'
})
export class WindowRefService {

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  get nativeWindow() {
    if (isPlatformBrowser(this.platformId)) {
      return _window();
    }
    return;
  }
}
