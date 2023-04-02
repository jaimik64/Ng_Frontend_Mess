import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CompileIdentifierMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private requests: HttpRequest<any>[] = []
  exmptedURL: string[] = []

  constructor(private router: Router, private loaderService: LoaderService, private matSnackbar: MatSnackBar) { }


  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);

    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0)
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var accessToken = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders(
      {
        'Authorization': 'Bearer ' + (accessToken === null ? '' : accessToken),
        'Expires': '0'
      }
    )

    if (req.url !== `${environment.baseUrl}${environment.login}`) {
      req = req.clone({ headers: headers });

      if (accessToken === '') {
        this.matSnackbar.open('User Invalid', 'Ok')
        // console.log('User Invalid');
        this.router.navigate(['/'])
      }
    }

    this.requests.push(req)

    if (!this.exmptedURL.includes(req.url)) {
      this.loaderService.isLoading.next(true);
    }

    return new Observable((observer: { next: (arg0: HttpEvent<any>) => void; error: (arg0: any) => void; complete: () => void; }) => {
      const subscription = next.handle(req).subscribe({
        next: event => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req)
            observer.next(event);
          }
        },
        error: (err: HttpErrorResponse) => {

          if (err.error.meta.message == null) {
            this.matSnackbar.open('Something went wrong', 'Try Again')
            console.log('Something went wrong');
          } else {
            this.matSnackbar.open(err.error.meta.message, 'Try Again')
            console.log('Modified Error Message here');
          }

          this.removeRequest(req);
          observer.error(err)
        },
        complete: () => {
          this.removeRequest(req)
          observer.complete()
        }
      })

      return () => {
        this.removeRequest(req);
        subscription.unsubscribe()
      }
    })
  }

}
