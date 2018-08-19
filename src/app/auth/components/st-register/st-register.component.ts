import { Component, OnInit } from '@angular/core';
import {  FormBuilder,
          FormGroup,
          Validators } from "@angular/forms";
import { User,
         Gender, 
         Role} from '../../../core/models/user';
import { matchingPasswordValidator } from '../../validators/matching-password.directive';
import { AuthService } from '../../../core/services/auth.service';
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: 'st-register',
  templateUrl: './st-register.component.html',
  styleUrls: ['./st-register.component.scss'],
  providers: [ AuthService ]
})
export class StRegisterComponent implements OnInit {
  registerForm: FormGroup;
  passwordGroup: FormGroup;
  submitted: boolean;
  loading: boolean;
  genders: Gender[];
  constructor( private router: Router,
               private authService: AuthService, 
               private formBuilder: FormBuilder) {

  }

  updateGender(gender) {
   console.log(gender);
   this.f.gender.setValue(gender);

  }

  registerNewUser() {
    this.loading = true;
    this.submitted = true;
    if(this.registerForm.invalid) {
      this.loading = false;
      return;
    }
    let self = this;

    this.authService.register(this.convertToUser())
    .subscribe(
      data => {
        let navigationExtras: NavigationExtras = {
          queryParams: { 'email': data.email },
          skipLocationChange: true 
        };
          this.router.navigate(['/register-success'], navigationExtras);
      },
      error => {
        this.resetPasswordForm();
        if (error.status == 409) {
          this.f.email.setErrors({"existed" : true})
        } else {
          this.registerForm.setErrors({serverError: true})
        }
        this.loading = false;
      });
  }
  
  resetPasswordForm() {
    this.passwordGroup.reset();
  }

  get f(){
    return this.registerForm.controls;
  }

  get p() {
    return this.passwordGroup.controls;
  }

  get LETTER_ONLY_PATTERN() {
    return "^([a-zA-Z\\s])*$";
  }

  ngOnInit() {
    this.passwordGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required]
    }, {
      validator: matchingPasswordValidator
    })
    this.registerForm = this.formBuilder.group({
      email: ['',[ Validators.required, Validators.email]],
      passwordGroup: this.passwordGroup,
      firstName: ['', [Validators.required,Validators.pattern(this.LETTER_ONLY_PATTERN)]],
      lastName: ['', [Validators.required, Validators.pattern(this.LETTER_ONLY_PATTERN)]],
      role: [Role.Student],
      gender: [Gender.UNKNOWN]
  });
  this.genders = [Gender.MALE, Gender.FEMALE, Gender.OTHER];
  this.loading = false;
  }

  convertToUser(): User {
    let user = new User();
    user.email = this.registerForm.value.email;
    user.password = this.passwordGroup.value.password;
    user.firstName = this.registerForm.value.firstName || '';
    user.lastName = this.registerForm.value.lastName || '';
    user.gender = this.registerForm.value.gender || 'unknown';
    user.role = Role.Student;
    return user;
  }
}

export class PasswordMatchingValidator {
  static validate(passwordGroup: FormGroup) {
    let password = passwordGroup.value.password;
    let repeatPassword = passwordGroup.value.repeatPassword;
    if(repeatPassword == null || repeatPassword != null && repeatPassword.length <= 0) {
      return null;
    }
    if(repeatPassword !== password) {
      
      return {
          matchedPassword: true
      }
    }
    return null;
  }
}
