import { environment } from '../../../environments/environment';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(AuthService);

    const clonedRequest = request.clone({
      headers: auth.getTokenHeader(request),
      url: this.fixUrl(request.url)
    });

    return next.handle(clonedRequest).pipe(
      catchError(error => {
        // handle if got 401 status it maybe token is token is expired
        const exceptRouters = ['/login'];
        if (error.status === 401 && (exceptRouters.indexOf(this.router.url) === -1)) {
          //remove users in local storage
          auth.removeTokens();
          //redirect to the signin page or show login modal here
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }

  private fixUrl(url: string) {
    if (url.indexOf('http://') >= 0 || url.indexOf('https://') >= 0) {
      return url;
    } else {
      return environment.apiEndpoint + url;
    }
  }
}
