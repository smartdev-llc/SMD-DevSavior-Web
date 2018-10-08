import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import {AppErrors} from '../../../core/error/app-errors';
import {Forbidden} from '../../../core/error/forbidden';
import {InternalServer} from '../../../core/error/internal-server';
import {Unauthorized} from '../../../core/error/unauthorized';

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
  isSubmited = false;
  formErrorMessage: string;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ){}

  ngOnInit() {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get email() {
    return this.loginInForm.get('email');
  }

  get password() {
    return this.loginInForm.get('password');
  }

  onSubmit () {
    let values = this.loginInForm.value;

    this.isSubmited = true;
    this.formErrorMessage = '';
    this.isResendEmailSuccess = false;

    if (this.loginInForm.invalid) {
      console.log('error', this.loginInForm);

    } else {
      this.isLoading = true;
      this.authService
        .login(values)
        .subscribe(user => {
            this.isLoading = false;
            this.authService.setTokenInLocalStorage(user, false);
            this.router.navigateByUrl(this.returnUrl);
          },
          (error: AppErrors) => {
            this.handleErrorLoginComponent(error);
          });
    }
  }

  initForm () {
    this.loginInForm = this.fb.group({
      'email': ['',[Validators.email, Validators.required]],
      'password': ['', Validators.required]
    });
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
        this.handleErrorLoginComponent
      );
  }

  ngOnDestroy() {
    if (this.loginSubs) { this.loginSubs.unsubscribe(); }
  }

  socialLogin(provider: string) {
    this.authService.socialLogin(provider)
      .then(_ => {
        this.router.navigate(['/']);
      });
  }

  handleErrorLoginComponent(error: AppErrors) {
    this.isLoading = false;

    if (error instanceof InternalServer) {
      console.log('Internal server', error);
    }
    else if (error instanceof Unauthorized) {
      console.log('Unauthorized ', error.originalError);
      this.formErrorMessage = error.originalError;
    }
    else if (error instanceof Forbidden) {
      console.log('Forbidden ', error.originalError);
      this.isNotVerified = true;
    }
    else {
      console.log('app error', error);
      throw error;
    }
  }

}
