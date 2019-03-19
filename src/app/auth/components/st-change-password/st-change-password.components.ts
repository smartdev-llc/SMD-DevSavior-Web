import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { matchingPasswordValidator } from '../../validators/matching-password.directive';
import { AppErrors } from '../../../core/error/app-errors';
import { InternalServer } from 'src/app/core/error/internal-server';
import { BadRequest } from 'src/app/core/error/bad-request';
import { Unauthorized } from 'src/app/core/error/unauthorized';

@Component({
  selector: 'st-change-password',
  templateUrl: './st-change-password.components.html',
  styleUrls: ['./st-change-password.components.scss']
})
export class StChangePasssword implements OnInit {
  public static CHANGE_PASSWORD_REDIRECT = 'st-change-password';
  static MiN_LENGTH_PASSWORD = 8;
  changePasswordFormGroup: FormGroup;
  loading = false;
  submitted = false;
  isSucceed = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router
    ) { }

  ngOnInit() {
    this.initForms();
  }

  initForms():void{
    this.changePasswordFormGroup = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required, Validators.minLength(StChangePasssword.MiN_LENGTH_PASSWORD)],
      repeatPassword: ['', Validators.required]
    },
    {
      validator: matchingPasswordValidator
    })
  }

  submitChangePassword(){
    this.submitted = false;
    this.isSucceed = false;
    if(!this.changePasswordFormGroup.valid){
      return;
    }

    this.loading = true;
    const data = {
      oldPassword: this.controls.oldPassword.value,
      newPassword: this.controls.newPassword.value
    };

    this.authService.changePassword(data).subscribe(
      (respone) => {
        this.authService.removeTokens();
        this.router.navigate(['/login'], {
          queryParams: { redirect: StChangePasssword.CHANGE_PASSWORD_REDIRECT }
        });
      },
      (error: AppErrors) => this.handleError(error)
    );

    this.submitted = true;
  }

  handleError(error: AppErrors){
    this.loading = false;
    let serverError = undefined;
    switch (error.constructor) {
      case InternalServer:
        serverError = 'Opps! Something wrong. Please try again later.';
        break;

      case BadRequest:
      case Unauthorized:
        serverError = error.originalError;
        break;
    }

    this.changePasswordFormGroup.setErrors({
      serverError: serverError
    });

  }

  get controls(){
    return this.changePasswordFormGroup.controls;
  }

  get hasServerError() {
    return (
      this.submitted &&
      this.changePasswordFormGroup.errors != null &&
      this.changePasswordFormGroup.errors.serverError != null
    );
  }

}
