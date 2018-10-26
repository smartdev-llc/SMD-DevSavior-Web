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

  createWorkingExperience(resource: any) {
    return this.http.post('/profile/me/working-experiences', resource)
    .pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  updateWorkingExperience(resource: any, id: any) {
    return this.http.put(`/profile/me/working-experiences/${id}`, resource)
    .pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  deleteWorkingExperience(id: any) {
    return this.http.delete(`/profile/me/working-experiences/${id}`)
    .pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  createEducationDegrees(resource: any) {
    return this.http.post('/profile/me/education-degrees', resource)
    .pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  updateEducationDegrees(resource: any, id: any) {
    return this.http.put(`/profile/me/education-degrees/${id}`, resource)
    .pipe(
      map((response: any) => response),
      catchError(this.handleError)
    )
  }

  deleteEducationDegrees(id: any) {
    return this.http.delete(`/profile/me/education-degrees/${id}`)
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
