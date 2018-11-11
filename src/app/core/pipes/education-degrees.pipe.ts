import { Pipe } from '@angular/core';
import { from } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({ name: 'educationDegrees' })
export class EducationDegrees {

  /**
   * @param {any} value
   * @returns
   *
   * @memberof ParseSkill
   */
  transform(value: string): any {
    switch (value) {
      case 'HIGH_SCHOOL':
        return 'education.highSchool';
      case 'ASSOCIATE_DEGREE':
        return 'education.associateDegree';
      case 'COLLEGE':
        return 'education.college';
      case 'BACHELOR':
        return 'education.bachelors';
      case 'MASTERS':
        return 'education.masters';
      case 'DOCTORATE':
        return 'education.doctorate';
      case 'AVERAGE':
        return 'education.average';
      case 'GOOD':
        return 'education.good';
      case 'EXCELLENT':
        return 'education.excellent';
      default:
        return value;
    }
  }
};
