import {
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export const salaryDifference: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  const from = Number(formGroup.value.fromSalary);
  const to = Number(formGroup.value.toSalary);
  if (isNaN(from) || isNaN(to) || !to) {
    return null;
  }
  if (from > to) {
    return {
      difference: true
    };
  }
  return null;
};
