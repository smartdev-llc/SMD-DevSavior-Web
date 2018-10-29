import { Pipe } from '@angular/core';
import { from } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { min } from 'moment';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({ name: 'cityPipe' })
export class CityPipe {

  /**
   * @param {any} value
   * @returns
   *
   * @memberof CityPipe
   */
  transform(cityCode: any): string {
    let cityName;
    switch(cityCode) {
      case 'DN': cityName = 'Da Nang';break;
      case 'TPHCM': cityName = 'Ho Chi Minh';break;
      case 'HN': cityName = 'Ha Noi';break;
      case 'OTHER': cityName = 'Other';break;
      default: cityName = cityCode;
    }
    return cityName
  }

  private appendCurrency(currency: string, amount: any) {
    return currency + amount;
  }
};
