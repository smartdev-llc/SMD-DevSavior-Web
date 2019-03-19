import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import {AppErrors} from '../../../core/error/app-errors';
import {Forbidden} from '../../../core/error/forbidden';
import {InternalServer} from '../../../core/error/internal-server';
import {Unauthorized} from '../../../core/error/unauthorized';
import { LanguageService } from '../../../layout/services/language.service';
import {BadRequest} from '../../../core/error/bad-request';
import { StChangePasssword } from '../st-change-password/st-change-password.components';

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
  isEnLang: boolean = false;
  isRedirectChangePassword = false;
  returnUrl: string;

  constructor(private languageService: LanguageService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ){ const lang = languageService.getCachedLanguage()
    languageService.setDefaultLang()
    if (lang === 'en') {
      this.isEnLang = true
    }}

  ngOnInit() {
    this.initForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    const redirectParam = this.route.snapshot.queryParamMap['redirect'];
    this.isRedirectChangePassword = redirectParam === StChangePasssword.CHANGE_PASSWORD_REDIRECT;
  }
  changeLanguage(language: string): void {
    this.languageService.changeLanguage(language).subscribe(() => {
      language === 'en' ? this.isEnLang = true : this.isEnLang = false;
    });
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
    this.isNotVerified = false;

    if (this.loginInForm.invalid) {

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
          if (message) {
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
    }
    else if (error instanceof Unauthorized) {
      this.formErrorMessage = error.originalError;
    }
    else if (error instanceof Forbidden) {
      this.isNotVerified = true;
    }
    else if (error instanceof BadRequest) {
      this.formErrorMessage = error.originalError;
    }
    else {
      throw error;
    }
  }

}
