import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const salaryDifference: ValidatorFn = (
  formGroup: FormGroup
): ValidationErrors | null => {
  const from = formGroup.value.expectedSalaryFrom;
  const to = formGroup.value.expectedSalaryTo;
  const isNegotiableSalary = formGroup.value.isNegotiableSalary;
  const patternNumber = /^[0-9]*$/;

  // Check for required
  if (!isNegotiableSalary) {
    const validator: any = {};

    if (!from) {
      validator.fromRequired = true;
    }

    if (!to) {
      validator.toRequired = true;
    }

    if (!patternNumber.test(from)) {
      validator.fromNotNumber = true;
    }

    if (!patternNumber.test(to)) {
      validator.toNotNumber = true;
    }

    if (Object.keys(validator).length) {
      return validator;
    }
  }

  // Check if from > to
  if (Number(from) > Number(to)) {
    return {
      difference: true
    };
  }

  return null;
};
