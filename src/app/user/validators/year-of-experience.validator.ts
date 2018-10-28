import {
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export const yearOfExperience: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  const { yearsOfExperience, noWorkExperience } = formGroup.value;
  const patternNumber = /^[0-9]*$/;

  if (!noWorkExperience) {
    let validator: any = {};

    if (!yearsOfExperience) {
      validator.required = true;
    }

    if (!patternNumber.test(yearsOfExperience)) {
      validator.notANumber = true
    }

    if (Object.keys(validator).length) return validator;
  }

  return null;
};
