import { Component, OnInit } from '@angular/core';
import {  FormBuilder,
          FormGroup,
          Validators } from '@angular/forms';
import { User,
         Gender,
         Role } from '../../../core/models/user';
import { matchingPasswordValidator } from '../../validators/matching-password.directive';
import { AuthService } from '../../../core/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-st-register',
  templateUrl: './st-register.component.html',
  styleUrls: ['./st-register.component.scss'],
  providers: [ AuthService ]
})
export class StRegisterComponent implements OnInit {
  static MAX_LENGTH_PASSWORD = 8;
  static DEFAULT_MESSAGE = 'Oops! Something bad happened. Please come back later.';
  registerForm: FormGroup;
  passwordGroup: FormGroup;
  submitted: boolean;
  loading: boolean;
  constructor( private router: Router,
               private authService: AuthService,
               private formBuilder: FormBuilder) {

  }

  registerNewUser() {
    this.loading = true;
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.loading = false;
      return;
    }

    this.authService.register(this.convertToUser())
    .subscribe(
      data => {
        const navigationExtras: NavigationExtras = {
          queryParams: { 'email': data.email },
          skipLocationChange: true
        };
          this.router.navigate(['/register-success'], navigationExtras);
      },
      error => {
        this.resetPasswordForm();
        if (error.status === 409) {
          this.f.email.setErrors({'existed' : true});
        } else if(error.status >= 500) {
          this.registerForm.setErrors({serverError: StRegisterComponent.DEFAULT_MESSAGE});
        } else {
          this.registerForm.setErrors({serverError: error.error.message});
        }
        this.loading = false;
      });
  }

  resetPasswordForm() {
    this.passwordGroup.reset();
  }

  get f() {
    return this.registerForm.controls;
  }

  get p() {
    return this.passwordGroup.controls;
  }

  get LETTER_ONLY_PATTERN() {
    return '^[^@!~#$%^&*()}{]*$';
  }

  ngOnInit() {
    this.passwordGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(StRegisterComponent.MAX_LENGTH_PASSWORD)]],
      repeatPassword: ['', Validators.required]
    }, {
      validator: matchingPasswordValidator
    });
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.passwordGroup,
      firstName: ['', [Validators.required, Validators.pattern(this.LETTER_ONLY_PATTERN)]],
      lastName: ['', [Validators.required, Validators.pattern(this.LETTER_ONLY_PATTERN)]],
      role: [Role.Student]
  });
  this.loading = false ;
  }

  convertToUser(): User {
    const user = new User();
    user.email = this.registerForm.value.email;
    user.password = this.passwordGroup.value.password;
    user.firstName = this.registerForm.value.firstName || '';
    user.lastName = this.registerForm.value.lastName || '';
    user.role = Role.Student;
    return user;
  }

  get hasServerError() {
    return this.submitted && this.registerForm.errors != null && this.registerForm.errors.serverError != null;
  }
}
