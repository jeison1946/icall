import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request)
    const valorAuth = localStorage.getItem('token-session');

    if (!request.headers.has('Authorization')) {
      if (valorAuth) {
        request = this.addToken(request, valorAuth);
      }
    }

    if (!request.headers.has('mime')) {
      if (!request.headers.has('Content-Type')) {
        request = this.contentType(request);
      }
    }

    // return next.handle(request);
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // if (error.error instanceof ErrorEvent)
        if (error instanceof HttpErrorResponse && error.status === 401) {
          localStorage.clear();
          this.router.navigateByUrl('/login');
        }

        return throwError(() => error)

      })
    ) as any;
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private contentType(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });
  }
}
