import { Pipe } from '@angular/core';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({ name: 'jobTypePipe' })
export class JobTypePipe {

  /**
   * @param {any} value
   * @returns
   *
   * @memberof JobTypePipe
   */
  transform(jobType: any): string {
    let jobTypeName;
    switch(jobType) {
      case 'PART_TIME': jobTypeName = 'PART TIME';break;
      case 'INTERNSHIP': jobTypeName = 'INTERNSHIP';break;
      case 'FULL_TIME': jobTypeName = 'FULL TIME';break;
      default: jobTypeName = jobType;
    }
    return jobTypeName
  }
};
