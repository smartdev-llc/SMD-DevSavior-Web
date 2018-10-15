import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppErrors } from '../../../core/error/app-errors';
import { Forbidden } from '../../../core/error/forbidden';
import {InternalServer} from '../../../core/error/internal-server';
import {Unauthorized} from '../../../core/error/unauthorized';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginInForm: FormGroup;
  loginSubs: Subscription;
  isNotVerified = false;
  isLoading = false;
  isSubmited = false;
  formErrorMessage: string;
  isResendEmailSuccess = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.initForm();
  }
  initForm () {
    this.loginInForm = this.fb.group({
      'email': ['', Validators.email],
      'password': ['', Validators.required]
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

    if (this.loginInForm.invalid) {
      console.log('error', this.loginInForm);

    } else {
      this.isLoading = true;
      this.authService
        .loginCompany(values)
        .subscribe(user => {
            this.isLoading = false;
            this.authService.setTokenInLocalStorage(user, false);
            this.router.navigateByUrl('/');
          },
          (error: AppErrors) => {
            this.handleErrorLoginComponent(error);
          });
    }

  }
  

  resendEmail( email: HTMLInputElement) {
    this.isLoading = true;

    this.authService
      .resendEmail( email.value, 'company')
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

  handleErrorLoginComponent(error : AppErrors){
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
