import { tap, map, filter, scan} from 'rxjs/operators';
import { AuthActions } from '../../actions/auth.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { getAuthStatus } from '../../reducers/selectors';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'job-detail',
  templateUrl: './st-login.component.html',
  styleUrls: ['./st-login.component.scss']
})
export class StLoginComponent implements OnInit, OnDestroy {
  loginInForm: FormGroup;
  loginSubs: Subscription;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private actions: AuthActions,
    private authService: AuthService
  ) {
    this.redirectIfUserLoggedIn();
  }

  ngOnInit() {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit () {
    const values = this.loginInForm.value;
    const keys = Object.keys(values);

    if (this.loginInForm.valid) {
      this.loginSubs = this.authService
        .login(values)
        .pipe(
          tap(_ => _, (user) => {
            const errors = user || 'Something went wrong';
            this.pushErrorFor('password', errors.error.message);
          })).subscribe();
    } else {
      keys.forEach(val => {
        const ctrl = this.loginInForm.controls[val];
        if (!ctrl.valid) {
          this.pushErrorFor(val, null);
          ctrl.markAsTouched();
        };
      });
    }

  }

  initForm () {

    this.loginInForm = this.fb.group({
      'email': ['', Validators.email],
      'password': ['', Validators.required]
    });
  }

  private pushErrorFor(ctrl_name: string, msg: string) {
    this.loginInForm.controls[ctrl_name].setErrors({ 'msg': msg });
  }

  redirectIfUserLoggedIn() {
    this.store.select(getAuthStatus).subscribe(
      data => {
        if (data === true) { this.router.navigate([this.returnUrl]); }
      }
    );
  }

  ngOnDestroy() {
    if (this.loginSubs) { this.loginSubs.unsubscribe(); }
  }

  socialLogin(provider: string) {
    this.store.dispatch(this.actions.oAuthLogin(provider));
  }

}
