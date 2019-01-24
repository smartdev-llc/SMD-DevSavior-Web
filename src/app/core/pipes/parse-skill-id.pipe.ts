import { Pipe } from '@angular/core';
import { from } from 'rxjs';
import { map, reduce } from 'rxjs/operators';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({ name: 'parseskillid' })
export class ParseSkillId {

  /**
   * @param {any} value
   * @returns
   *
   * @memberof ParseSkillId
   */
  transform(value: Array<any>) {
    let skills = '';
    from(value)
      .pipe(
        map(val => val.id),
        reduce((acc, value) => acc + ", " + value)
      ).subscribe(val => {
        skills =  val
      })
    return skills;
  }
};
