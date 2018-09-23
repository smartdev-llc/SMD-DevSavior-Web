import {Injectable} from '@angular/core';
import {DataService} from '../data.service';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class PostJobCompanyService extends DataService{

  constructor(http: HttpClient) {
    super('/job', http);
  }
}
