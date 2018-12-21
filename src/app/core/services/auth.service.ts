import { User, Authenticate, Role } from '../models/user';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpEvent,
  HttpParams
} from '@angular/common/http';
import { AuthActions } from '../../auth/actions/auth.actions';
import { AppState } from '../../interfaces';
import { Store } from '@ngrx/store';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppErrors } from '../error/app-errors';
import { Forbidden } from '../error/forbidden';
import { InternalServer } from '../error/internal-server';
import {
  AuthService as SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from "angular-6-social-login";
import {Unauthorized} from '../error/unauthorized';
import {BadRequest} from '../error/bad-request';


@Injectable()
export class AuthService {

  static PREFIX_AUTHORIZATION = 'Bearer ';
  @Output() getLoggedInUser: EventEmitter<any> = new EventEmitter();

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
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private socialAuthService: SocialAuthService
  ) { }


  /**
   *
   *
   * @param {Authenticate} { email, password }
   * @returns {Observable<User>}
   * @memberof AuthService
   */
  login({ email, password }: Authenticate): Observable<User> {
    const params = { email, password, role: Role.Student };
    return this.http
      .post<User>('/auth/login', params)
      .pipe(
        map(
          (response: any) => {
            return response;
          }
        ),
        catchError(this.handleError)
      );
  }

  loginCompany({ email, password }: Authenticate): Observable<User> {
    const params = { email, password, role: Role.Company };
    return this.http
      .post<User>('/auth/login', params)
      .pipe(
        map(
          (response: any) => {
            console.log('[login()][response]', response.message);
            return response;
          }
        ),
        catchError(this.handleError)
      );
  }

  register(data: any): Observable<User> {
    return this.http.post<User>('/auth/signup', data);
  }

  // catch should be handled here with the http observable
  // so that only the inner obs dies and not the effect Observable
  // otherwise no further login requests will be fired
  // MORE INFO https://youtu.be/3LKMwkuK0ZE?t=24m29s
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
    const requestBody: any = { password: password };
    let param: HttpParams = new HttpParams();
    param = param.set('token', token);
    return this.http.post('/auth/reset-password', requestBody, { params: param });
  }

  forgotPassword(email: string, role: Role): Observable<any> {
    const requestBody: any = { email: email, role: role };
    return this.http.post('/auth/forgot-password', requestBody);
  }

  verifyAccount(token: string): Observable<any> {
    return this.http.post('/auth/verify', { token });
  }

  resendVerificationEmail(email: string, role: Role): Observable<any> {
    const requestBody: any = { email: email, role: role };
    return this.http.post('/auth/resend-email', requestBody);
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
  logout(): Observable<any> {
    let param: HttpParams = new HttpParams();
    // param = param.set('token', token);
    return this.http.post('/auth/logout', param);
  }

  /**
   *
   *
   * @returns {{}}
   * @memberof AuthService
   */
  getTokenHeader(request: HttpRequest<any>): HttpHeaders {


    return new HttpHeaders({
      'Content-Type': request.headers.get('Content-Type') || 'application/json',
      'Authorization': this.getAccessToken()
    });
  }

  getAccessToken() {
    const user: User = ['undefined', null]
    .indexOf(localStorage.getItem('user')) === -1 ?
    JSON.parse(localStorage.getItem('user')) : {};
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
  setTokenInLocalStorage(user_data: any, socialLogin: boolean): void {
    user_data.access_token = user_data.token;
    if (socialLogin) {
      user_data.socialLogin = true;
    }
    localStorage.setItem('user', JSON.stringify(user_data));
    this.getLoggedInUser.emit(user_data);
  }

  resendEmail(email, userRole) {
    let userParam = { email: email, role: userRole };
    return this.http
      .post('/auth/resend-email', userParam)
      .pipe(
        map(
          (response: any) => {
            console.log('data is', response);
            return response.message;
          }),
        catchError(this.handleError)
      );

  }

  //TODO: Move handleError() in each Service class into one Class
  private handleError(error) {
    if (error.status === 403) {
      return throwError(new Forbidden(error.error.message));
    }
    if (error.status === 500) {
      return throwError(new InternalServer(error.error.message));
    }
    if (error.status === 401) {
      return throwError(new Unauthorized(error.error.message));
    }
    if (error.status === 400){
      return throwError(new BadRequest(error.error.message));
    }
    return throwError(new AppErrors(error.error.message));
  }

  socialLogin(provider: string) {
    let socialPlatformProvider;
    if (provider == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (provider == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    return this.socialAuthService.signIn(socialPlatformProvider)
      .then(userData => {
        if (userData) {
          return this.sendTokenToServer(userData)
            .subscribe(data => {
              this.setTokenInLocalStorage(data, true);
              return data;
            })
        }
      })
  }

  sendTokenToServer(userData: any): Observable<any> {
    let param = { 'access_token': userData.token };
    return this.http.post<User>('/auth/' + userData.provider.toLowerCase(), param);
  }

  signOut(): void {
    let userData = this.getCurrentUser();
    if (userData && userData.socialLogin) {
      this.socialAuthService.signOut();
    }
  }

  isLoggedIn(): boolean {
    if (this.getCurrentUser()) {
      return true;
    }
    return false;
  }

  getCurrentUser(): User {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch (error) {
      return null;
    }
  }

  getJobItem() {
    return this.http.get('/jobs')
    .pipe(
      map((response: Response) => response),
    )
  }

  getSkillSubscription(): Observable<any>{
    return this.http.get<User>('/skill-subscriptions')
    .pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  getSkills(){
    return this.http.get('/skills')
    .pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  updateSkill(id: any, resource:any): Observable<any>{
    return this.http.post<User>(`/skills/${id}/subscriptions`, resource)
    .pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  deleteSkill(id: any): Observable<any>{
    return this.http.delete<User>(`/skills/${id}/subscriptions`)
    .pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  removeTokens(): void {
    localStorage.removeItem('user');
  }
}
