import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidationErrors
} from '@angular/forms';
import { ActivatedRoute, Params } from '../../../../../node_modules/@angular/router';
import { StRegisterComponent } from '../st-register/st-register.component';
import { matchingPasswordValidator } from '../../validators/matching-password.directive';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-st-reset-password',
  templateUrl: './st-reset-password.component.html',
  styleUrls: ['./st-reset-password.component.css']
})
export class StResetPasswordComponent implements OnInit {
  private static DEFAULT_MESSAGE_INTERNAL_ERROR = 'Error while reseting password.';
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
      password: ['', [Validators.required, Validators.minLength(StRegisterComponent.MAX_LENGTH_PASSWORD)]],
      repeatPassword: ['', [Validators.required]]
    }, {
      validator: matchingPasswordValidator
    });
  }

  resetPassword() {
    this.loading = true;
    this.submitted = true;
    if (this.resetPasswordForm.invalid) {
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
      validationError = { serverError: {serverError: true, message: StResetPasswordComponent.DEFAULT_MESSAGE_INTERNAL_ERROR}};
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
            && this.resetPasswordForm.errors !== undefined
            && this.resetPasswordForm.errors.serverError !== undefined;
  }

}
