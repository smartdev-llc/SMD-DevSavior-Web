import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Company } from '../../models/company';

@Injectable()
export class InfoCompanyService {

  constructor(  private http: HttpClient,) {
  }
  getInfoCompany(id): Observable<Company> {
    return this.http.get('/companies/'+id)
    .pipe(
      map((response: any) => response),
    )
  }
}
