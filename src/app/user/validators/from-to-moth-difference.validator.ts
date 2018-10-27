import {
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

import * as moment from 'moment';

export const fromToMothDifference: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  const { fromMonth, toMonth, isCurrentJob } = formGroup.value;

  if (!fromMonth) {
    return {
      fromRequired: true
    };
  }

  if (!toMonth && !isCurrentJob) {
    return {
      toRequired: true
    };
  }

  // Check if fromMonth great than toMonth using moment
  const dateFrom = moment(fromMonth, 'MM-YYYY');
  const dateTo = moment(toMonth, 'MM-YYYY');
  if (dateFrom.isAfter(dateTo)) {
    return {
      difference: true
    };
  }

  return null;
};
