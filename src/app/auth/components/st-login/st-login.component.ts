import {tap} from 'rxjs/operators';
import { AuthActions } from '../../actions/auth.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { getAuthStatus } from '../../reducers/selectors';
import { Subscription } from 'rxjs';
import {AppErrors} from '../../../core/error/app-errors';
import {Forbidden} from '../../../core/error/forbidden';
import {InternalServer} from '../../../core/error/internal-server';

@Component({
  selector: 'job-detail',
  templateUrl: './st-login.component.html',
  styleUrls: ['./st-login.component.scss']
})
export class StLoginComponent implements OnInit, OnDestroy {
  loginInForm: FormGroup;
  loginSubs: Subscription;
  returnUrl: string;
  isNotVerified = false;
  isLoading = false;

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

    console.log('value', values);

    if (this.loginInForm.valid) {
      this.isLoading = true;
      this.loginSubs = this.authService
        .login(values).pipe(
          tap(_ => _, (user) => {
            const errors = user || 'Something went wrong';
            keys.forEach(val => {
              this.pushErrorFor(val, errors);
            });
          })).subscribe(
            response =>this.isLoading= false,
          (error) => {

              if (error instanceof Forbidden ) {
                console.log('forbidden', error);
                  this.isNotVerified = true;
                  this.isLoading= false
              } else {
                console.log('app error');
              }
            }
          );
    } else {
      keys.forEach(val => {
        const ctrl = this.loginInForm.controls[val];
        if (!ctrl.valid) {
          this.pushErrorFor(val, null);
          ctrl.markAsTouched();
        }
      });
    }

  }

  initForm () {
    const email = '';
    const password = '';

    this.loginInForm = this.fb.group({
      'email': [email, Validators.required],
      'password': [password, Validators.required]
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

  resendEmail( email: HTMLInputElement) {
    this.isLoading = true;

    this.authService
      .resendEmail( email.value, 'student')
      .subscribe(
        message => {
          if ( message === 'Sent email.') {
            this.isLoading = false;
            this.isNotVerified = false;
          }
        },
        (error: AppErrors) => {
          if (error instanceof InternalServer ) {
            console.log('interanale server', error);

          } else {
            console.log('app error');
          }}
      );
  }

  ngOnDestroy() {
    if (this.loginSubs) { this.loginSubs.unsubscribe(); }
  }

}
