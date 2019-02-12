import { Pipe } from '@angular/core';
import { from } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { min } from 'moment';
import { TranslateService } from '@ngx-translate/core';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({ name: 'salaryConverter' })
export class SalaryConverterPipe {

  /**
   * @param {any} value
   * @returns
   *
   * @memberof SalaryConverterPipe
   */
  constructor(private translate: TranslateService){}

  transform(minSalary: any, maxSalary:any, currency = 'USD'): string {
    if (!minSalary && !maxSalary) {
      return '';
    }
    if( minSalary == maxSalary) {
      return this.appendCurrency(currency, minSalary);
    }
    else if( minSalary == 0) {
      return this.translate.instant('company.upTo') + this.appendCurrency(currency, maxSalary);
    }
    else {
      return this.appendCurrency(currency, minSalary) + '-' + this.appendCurrency(currency, maxSalary);
    }
  }

  private appendCurrency(currency: string, amount: any) {
    return currency + amount;
  }
};
