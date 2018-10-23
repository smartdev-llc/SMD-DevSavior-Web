import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpEvent,
  HttpParams
} from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { AppErrors } from '../../core/error/app-errors';

@Injectable()
export class StudentUserService {

  constructor(
    private http: HttpClient
  ) { }

  updateBasicInfo(resource: any) {
    return this.http.put('/profile/me/basic-info', resource)
    .pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  getMyProfile() {
    return this.http.get('/profile/me')
    .pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  updatePersonalInfo(resource: any) {
    return this.http.put('/profile/me/personal-info', resource)
    .pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  updateSkills(resource: any) {
    return this.http.put('/profile/me/skills', resource)
    .pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  private handleError (error: Response) {
    console.log('error in data service', error);
    return throwError( new AppErrors(error));
  }
}
