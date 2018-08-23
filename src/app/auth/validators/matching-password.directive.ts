import { Directive } from '@angular/core';
import { NG_VALIDATORS, 
          Validators,
          FormGroup,
          ValidationErrors, 
          ValidatorFn
        } from '@angular/forms';

export const matchingPasswordValidator: ValidatorFn =  (passwordFormGroup: FormGroup): ValidationErrors | null => {
    let password = passwordFormGroup.value.password;
    let repeatPassword = passwordFormGroup.value.repeatPassword;
    if(repeatPassword == null || repeatPassword != null && repeatPassword.length <= 0) {
      return null;
    }
    if(repeatPassword !== password) {
      
      return {
          matchedPassword: true
      }
    }
    return null;
  };

@Directive({
  selector: '[atchingPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: MatchingPasswordDirective, multi: true}]
})
export class MatchingPasswordDirective extends Validators{

  constructor() { 
    super();
  }

  validate(formGroup: FormGroup): ValidationErrors {
    let password = formGroup.value.password;
    let repeatPassword = formGroup.value.repeatPassword;
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
