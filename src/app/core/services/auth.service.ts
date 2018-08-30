import { User, Authenticate, Role } from '../models/user';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient,
         HttpRequest,
         HttpHeaders,
         HttpEvent,
         HttpParams} from '@angular/common/http';
import { AuthActions } from '../../auth/actions/auth.actions';
import { AppState } from '../../interfaces';
import { Store } from '../../../../node_modules/@ngrx/store';
import { map, tap } from 'rxjs/operators';
@Injectable()
export class AuthService {

  static PREFIX_AUTHORIZATION = 'Bearer ';

  /**
   * Creates an instance of AuthService.
   * @param {HttpService} http
   * @param {AuthActions} actions
   * @param {Store<AppState>} store
   *
   * @memberof AuthService
   */
  constructor(
    private http: HttpClient,
    private actions: AuthActions,
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}


  /**
   *
   *
   * @param {Authenticate} { email, password }
   * @returns {Observable<User>}
   * @memberof AuthService
   */
  login({ email, password }: Authenticate): Observable<User> {
    const params = { email, password, role: 'student' };
    return this.http.post<User>('/auth/login', params).pipe(
      map(user => {
        this.setTokenInLocalStorage(user);
        this.store.dispatch(this.actions.loginSuccess());
        return user;
      }),
      tap(
        _ => this.router.navigate(['/'])
      )
    );
    // catch should be handled here with the http observable
    // so that only the inner obs dies and not the effect Observable
    // otherwise no further login requests will be fired
    // MORE INFO https://youtu.be/3LKMwkuK0ZE?t=24m29s
  }

  register(data: any): Observable<User> {
    return this.http.post<User>('/auth/signup', data);
  }

  /**
   *
   *
   * @param {string} password
   * @param {string} token
   * @returns {Observable<any>}
   * @memberof AuthService
   *
   */
   
  resetPassword(password: string, token: string | ''): Observable<any> {
    const requestBody: any = { password: password};
    let param: HttpParams = new HttpParams();
    param = param.set('token', token);
    return this.http.post('/auth/reset-password', requestBody, { params: param });
  }

  forgotPassword(email: string, role: Role): Observable<any> {
    const requestBody: any = { email: email, role: role}
    return this.http.post('/auth/forgot-password', requestBody);
  }


  /**
   *
   *
   * @returns {Observable<any>}
   *
   * @memberof AuthService
   */
  authorized(): Observable<any> {
    return this.http.get('api/v1/users').pipe(map((res: Response) => res));
    // catch should be handled here with the http observable
    // so that only the inner obs dies and not the effect Observable
    // otherwise no further login requests will be fired
    // MORE INFO https://youtu.be/3LKMwkuK0ZE?t=24m29s
  }

  /**
   *
   *
   * @returns
   *
   * @memberof AuthService
   */
  logout() {
    return this.http.get('logout').pipe(
      map((res: Response) => {
        // Setting token after login
        localStorage.removeItem('user');
        this.store.dispatch(this.actions.logoutSuccess());
        return res;
      })
    );
  }

  /**
   *
   *
   * @returns {{}}
   * @memberof AuthService
   */
  getTokenHeader(request: HttpRequest<any>): HttpHeaders {
    const user: User = ['undefined', null]
      .indexOf(localStorage.getItem('user')) === -1 ?
      JSON.parse(localStorage.getItem('user')) : {};

    return new HttpHeaders({
      'Content-Type': request.headers.get('Content-Type') || 'application/json',
      'Authorization': this.getAccessTokenFromUser(user)
    });
  }

  getAccessTokenFromUser(user) {
    if (user !== undefined) {
      return AuthService.PREFIX_AUTHORIZATION + user.access_token;
    }
    return '';
  }

  /**
   *
   *
   * @private
   * @param {any} user_data
   *
   * @memberof AuthService
   */
  private setTokenInLocalStorage(user_data: any): void {
    const token = user_data.token;
    localStorage.setItem('user.access_token', token);
  }
}
