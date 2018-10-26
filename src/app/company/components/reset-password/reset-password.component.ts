import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { StRegisterComponent } from '../../../auth/components/st-register/st-register.component';
import { matchingPasswordValidator } from '../../../auth/validators/matching-password.directive';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  public static DEFAULT_MESSAGE_INTERNAL_ERROR = 'Oops! Something wrong happened. Please try again later!';
  private token: string;
  resetPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  resetPasswordSuccess = false;

  constructor(private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.router.queryParams.subscribe((params: Params) => this.getTokenFromUrl(params));
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required]]
    }, {
      validator: matchingPasswordValidator
    });
  }

  resetPassword() {
    this.loading = true;
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
      this.loading = false;
      return;
    }

    this.authService.resetPassword(this.resetPasswordForm.value.password, this.token)
      .subscribe(
        data => {
          this.resetPasswordSuccess = true;
          this.loading = false;
        },
        error => {
          this.resetPasswordForm.reset();
          this.handleResponse(error);
          this.loading = false;
        });
  }

  handleResponse(error) {
    let validationError: ValidationErrors;
    if (error.status === 403) {
      validationError = { serverError: {invalidToken: true}};
    } else {
      validationError = { serverError: {serverError: true, message: ResetPasswordComponent.DEFAULT_MESSAGE_INTERNAL_ERROR}};
    }

    this.resetPasswordForm.setErrors(validationError);
  }

  get control() {
    return this.resetPasswordForm.controls;
  }

  getTokenFromUrl(params: Params ) {
    this.token = params.token || '';
  }

  get hasServerError() {
    return this.submitted
            && this.resetPasswordForm.errors != null
            && this.resetPasswordForm.errors.serverError != null;
  }

}
