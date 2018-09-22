import {Injectable} from '@angular/core';
import {DataService} from '../data.service';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class CategoryCompanyService extends DataService{

  constructor(http: HttpClient) {
    super('/category', http);
  }
}
