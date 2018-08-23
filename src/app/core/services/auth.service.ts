import { User, Authenticate } from "../models/user";
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { HttpClient,
         HttpRequest,
         HttpHeaders, 
         HttpEvent} from "@angular/common/http";
import { AuthActions } from "../../auth/actions/auth.actions";
import { AppState } from "../../interfaces";
import { Store } from "../../../../node_modules/@ngrx/store";
import { map, tap } from "rxjs/operators";
@Injectable()
export class AuthService {
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
    return this.http.post<User>('/auth/signup',
                                data);
  }
  
    // catch should be handled here with the http observable
    // so that only the inner obs dies and not the effect Observable
    // otherwise no further login requests will be fired
    // MORE INFO https://youtu.be/3LKMwkuK0ZE?t=24m29s
  /**
   *
   *
   * @param {anyUser} data
   * @returns {Observable<any>}
   * @memberof AuthService
   */
  forgetPassword(data: User): any {
    return [];
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
    return this.http.get('logout.json').pipe(
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
      'access_token': user.access_token || ''
    });
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
    localStorage.setItem("user.access_token", token);
  }
}
