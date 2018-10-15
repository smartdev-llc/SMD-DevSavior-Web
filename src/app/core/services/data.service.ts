import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AppErrors} from '../error/app-errors';

export class DataService {

  constructor(private url: string, private http: HttpClient) {  }

  getAll(){
    return this.http.get(this.url)
      .pipe(
        map( (response) => response),
        catchError (this.handleError)
      );
  }

  createData (resource: any){
    return this.http.post(this.url, resource)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  private handleError (error: Response) {
    console.log('error in data service', error);
    return throwError( new AppErrors(error));
  }
}
