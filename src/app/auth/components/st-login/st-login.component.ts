import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import {AppErrors} from '../../../core/error/app-errors';
import {Forbidden} from '../../../core/error/forbidden';
import {InternalServer} from '../../../core/error/internal-server';

@Component({
  selector: 'login',
  templateUrl: './st-login.component.html',
  styleUrls: ['./st-login.component.scss']
})
export class StLoginComponent implements OnInit, OnDestroy {
  loginInForm: FormGroup;
  loginSubs: Subscription;
  isNotVerified = false;
  isLoading = false;
  isResendEmailSuccess = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit() {
    this.initForm();
  }

  onSubmit () {
    const values = this.loginInForm.value;
    const keys = Object.keys(values);

    if (this.loginInForm.valid) {
      this.isLoading = true;
      this.isResendEmailSuccess = false;
      this.loginSubs = this.authService.login(values)
        .subscribe(user => {
          this.isLoading = false;
          this.authService.setTokenInLocalStorage(user, false);
          this.router.navigate(['/']);
        }, error => {
          this.isLoading = false;
          if (error instanceof Forbidden) {
            console.log('forbidden', error);
            this.isNotVerified = true;

          } else {
            console.log('app error');
          }
        })
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

    this.loginInForm = this.fb.group({
      'email': ['', Validators.email],
      'password': ['', Validators.required]
    });
  }

  private pushErrorFor(ctrl_name: string, msg: string) {
    this.loginInForm.controls[ctrl_name].setErrors({ 'msg': msg });
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
            this.isResendEmailSuccess = true;
          }
        },
        (error: AppErrors) => {
          this.isLoading = false;
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

  socialLogin(provider: string) {
    this.authService.socialLogin(provider)
      .then(_ => {
        this.router.navigate(['/']);
      })
  }
}
