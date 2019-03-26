import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { matchingPasswordValidator } from '../../validators/matching-password.directive';
import { AppErrors } from '../../../core/error/app-errors';
import { InternalServer } from 'src/app/core/error/internal-server';
import { BadRequest } from 'src/app/core/error/bad-request';
import { Unauthorized } from 'src/app/core/error/unauthorized';

@Component({
  selector: 'st-change-password',
  templateUrl: './st-change-password.components.html',
  styleUrls: ['./st-change-password.components.scss'],
})
export class StChangePasssword implements OnInit {
  @ViewChild('changePasswordAlert') changePasswordAlert: ModalDirective;
  public static CHANGE_PASSWORD_REDIRECT = 'st-change-password';
  static MiN_LENGTH_PASSWORD = 8;
  changePasswordFormGroup: FormGroup;
  loading = false;
  submitted = false;
  isSucceed = false;
  oldPasswordFlag = false;
  newPasswordFlag = false;
  confirmedPasswordFlag = false;

  constructor(
    private toastr: ToastrService,
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
      oldPassword: ['', [Validators.required, Validators.minLength(StChangePasssword.MiN_LENGTH_PASSWORD)]],
      password: ['', [Validators.required, Validators.minLength(StChangePasssword.MiN_LENGTH_PASSWORD)]],
      repeatPassword: ['', Validators.required]
    },
    {
      validator: matchingPasswordValidator
    })
  }

  submitChangePassword(){
    this.submitted = true;
    this.isSucceed = false;
    if(!this.changePasswordFormGroup.valid){
      return;
    }
    this.loading = true;
    const data = {
      password: this.controls.oldPassword.value,
      newPassword: this.controls.password.value
    };

    this.authService.changePassword(data).subscribe(
      (respone) => {
        this.showChangePasswordSuccess();
        this.authService.removeTokens();
        this.router.navigate(['/login'], {
          queryParams: { redirect: StChangePasssword.CHANGE_PASSWORD_REDIRECT }
        });
      },
      (error: AppErrors) => this.handleError(error)
    );
  }

  showChangePasswordSuccess(){
    this.toastr.success(
      this.translate.instant('changePassword.changePasswordMessage')
    )
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

  toggle(passwordFlag: string){
    switch (passwordFlag) {
      case 'oldPassword': this.oldPasswordFlag = !this.oldPasswordFlag; break;
      case 'newPassword': this.newPasswordFlag = !this.newPasswordFlag; break;
      case 'confirmedPassword': this.confirmedPasswordFlag = !this.confirmedPasswordFlag; break;
    }
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
