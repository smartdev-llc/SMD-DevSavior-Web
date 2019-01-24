import { Pipe } from '@angular/core';
import { from } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { min } from 'moment';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({ name: 'salaryConverter' })
export class SalaryConverterPipe {

  /**
   * @param {any} value
   * @returns
   *
   * @memberof SalaryConverterPipe
   */
  transform(minSalary: any, maxSalary:any, currency = 'USD'): string {
    if (!minSalary && !maxSalary) {
      return '';
    }
    if( minSalary == maxSalary) {
      return this.appendCurrency(currency, minSalary);
    }
    else if( minSalary == 0) {
      return 'Up to ' + this.appendCurrency(currency, maxSalary);
    }
    else {
      return this.appendCurrency(currency, minSalary) + '-' + this.appendCurrency(currency, maxSalary);
    }
  }

  private appendCurrency(currency: string, amount: any) {
    return currency + amount;
  }
};
