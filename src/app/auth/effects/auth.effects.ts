import { filter, switchMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { Action } from '@ngrx/store';
import { AuthService } from '../../core/services/auth.service';
import { AuthActions } from '../actions/auth.actions';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private authActions: AuthActions
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect()
  Authorized$: Observable<Action> = this.actions$
    .ofType(AuthActions.AUTHORIZE)
    .pipe(
      switchMap(() => this.authService.authorized()),
      filter(data => !data.error && data.count),
      map(() => this.authActions.loginSuccess())
    );
}
