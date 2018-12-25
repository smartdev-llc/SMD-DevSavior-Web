import { Component, OnInit } from '@angular/core';
import {  FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { UserCompany,  Role } from '../../../core/models/user';
import { matchingPasswordValidator } from '../../../auth/validators/matching-password.directive';
import { AuthService } from '../../../core/services/auth.service';
import { LanguageService } from '../../../layout/services/language.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-cp-register',
  templateUrl: './cp-register.component.html',
  styleUrls: ['./cp-register.component.css'],
  providers: [ AuthService ]
})
export class CpRegisterComponent implements OnInit {
  static MIN_LENGTH_PASSWORD = 8;
  static DEFAULT_MESSAGE = 'Oops! Something bad happened. Please come back later.';
  isEnLang: boolean = false;
  registerForm: FormGroup;
  passwordGroup: FormGroup;
  submitted: boolean;
  loading: boolean;
  constructor(
    private languageService: LanguageService,
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
      const lang = languageService.getCachedLanguage()
    languageService.setDefaultLang()
    if (lang === 'en') {
      this.isEnLang = true
    }
     }
     changeLanguage(language: string): void {
      this.languageService.changeLanguage(language).subscribe(() => {
        language === 'en' ? this.isEnLang = true : this.isEnLang = false;
      });
    }
  registerNewUser() {
    this.loading = true;
    this.submitted = true;
      if (this.registerForm.invalid) {
        this.loading = false;
        return;
      }
      this.authService.register(this.convertToCompany())
      .subscribe(
        data => {
          const navigationExtras: NavigationExtras = {
          queryParams: { 'email': data.email },
          skipLocationChange: true
        };
        this.router.navigate(['/register-success'], navigationExtras);
        },
        error=>{
          this.resetPasswordForm();
          if(error.status === 409){
            this.f.email.setErrors({'existed':true});
          }else if(error.status >= 500){
            this.registerForm.setErrors({serverError: CpRegisterComponent.DEFAULT_MESSAGE});
          }else{
            this.registerForm.setErrors({serverError:error.error.message})
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
      password:['',[Validators.required,Validators.minLength(CpRegisterComponent.MIN_LENGTH_PASSWORD)]],
      repeatPassword:['',[Validators.required]]
    },{
      validators: matchingPasswordValidator
    });
    this.registerForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      passwordGroup:this.passwordGroup,
      address:['',[Validators.required]],
      city:['',[Validators.required]],
      contactName:['',[Validators.required,Validators.pattern(this.LETTER_ONLY_PATTERN)]],
      name:['',[Validators.required,Validators.pattern(this.LETTER_ONLY_PATTERN)]],
      phoneNumber:['',[Validators.required]],
      website:['',[Validators.required]],
      checkbox:['',[Validators.required]],
      role:[Role.Company],
    });
    this.loading = false;

  }
  
convertToCompany(): UserCompany {
    const userCompany = new UserCompany();
    userCompany.email = this.registerForm.value.email;
    userCompany.password = this.passwordGroup.value.password;
    userCompany.address = this.registerForm.value.address || '';
    userCompany.city = this.registerForm.value.city || '';
    userCompany.contactName = this.registerForm.value.contactName || '';
    userCompany.name = this.registerForm.value.name || ''; 
    userCompany.phoneNumber = this.registerForm.value.phoneNumber || '';
    userCompany.website = this.registerForm.value.website || '';
    userCompany.role = Role.Company;
    return userCompany;
  }

  get hasServerError() {
    return this.submitted && this.registerForm.errors != null && this.registerForm.errors.serverError != null;
  }
}
