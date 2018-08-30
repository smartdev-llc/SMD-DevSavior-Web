import { Directive } from '@angular/core';
import { NG_VALIDATORS,
          Validators,
          FormGroup,
          ValidationErrors,
          ValidatorFn
        } from '@angular/forms';

export const matchingPasswordValidator: ValidatorFn =  (passwordFormGroup: FormGroup): ValidationErrors | null => {
    const password = passwordFormGroup.value.password;
    const repeatPassword = passwordFormGroup.value.repeatPassword;
    if (repeatPassword == null || repeatPassword != null && repeatPassword.length <= 0) {
      return null;
    }
    if (repeatPassword !== password) {
      return {
          matchedPassword: true
      };
    }
    return null;
  };

@Directive({
  selector: '[appMatchingPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: MatchingPasswordDirective, multi: true}]
})
export class MatchingPasswordDirective extends Validators {

  constructor() {
    super();
  }

  validate(formGroup: FormGroup): ValidationErrors {
    const password = formGroup.value.password;
    const repeatPassword = formGroup.value.repeatPassword;
    if (repeatPassword == null || repeatPassword != null && repeatPassword.length <= 0) {
      return null;
    }
    if (repeatPassword !== password) {

      return {
          matchedPassword: true
      };
    }
    return null;
  }

}
