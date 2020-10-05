import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

const LOGIN_PAGE_PATH = 'login';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {
    console.log('AuthInterceptorService');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getAccessTokenSync();
    if (!token) {
      return next.handle(req);
    }
    const headers = { Authorization: `Bearer ${token}` };
    if (req.responseType === 'json') {
      headers['Content-Type'] = 'application/json';
    }
    const request = req.clone({ setHeaders: headers });
    return next.handle(request).pipe(catchError((response: HttpErrorResponse) => {
      console.log('AuthInterceptorService handle error response');
      if (response.status === 401) {
        this.router.navigate([ LOGIN_PAGE_PATH ]);
      }
      return throwError(response);
    }));
  }
}
