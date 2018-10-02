import {Injectable} from '@angular/core';
import {DataService} from '../data.service';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class SkillService extends DataService{

  constructor(http: HttpClient) {
    super('/skills', http);
  }
}
