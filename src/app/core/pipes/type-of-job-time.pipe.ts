import { Pipe } from '@angular/core';
import { from } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({ name: 'typeOfJobTime' })
export class TypeOfJobTime {

  /**
   * @param {any} value
   * @returns
   *
   * @memberof ParseSkill
   */
  transform(value: string): any {
    switch (value) {
      case 'FULL_TIME':
        return 'Full Time';
      case 'PART_TIME':
        return 'Part Time';
      case 'CONTRACT':
        return 'Contract';
      case 'INTERNSHIP':
        return 'Internship';
      default:
        return value;
    }
  }
};
