import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Observable, throwError} from 'rxjs';

import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpEvent,
  HttpParams
} from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import {AppErrors} from '../error/app-errors';
import {Forbidden} from '../error/forbidden';
import {InternalServer} from '../error/internal-server';
import {Unauthorized} from '../error/unauthorized';
import {Duplicate} from '../error/duplicate';
import {NotFound} from '../error/not-found';

@Injectable()
export class JobService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  getJobCategories() {
    return this.http.get('/categories')
    .pipe(
      map((response: Response) => response),
    );
  }

  searchJobs(params: HttpParams) {
    return this.http.get('/jobs/search', { params })
    .pipe(
      map((response: any) => response),
    );
  }

  getDetailJob (jobSlug): Observable<any> {
    return this.http.get('/jobs/' + jobSlug)
      .pipe(
        map( response => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  applyJobForStudent (jobId: string) {
    return this.http
      .post('/jobs/' + jobId + '/applications', '')
      .pipe(
        map( response => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  getRecommenedJob(jobSlug: string) {
    return this.http.get('/jobs/' + jobSlug + '/recommended' );
  }

  //TODO: Move handleError() in each Service class into one Class
  private handleError(error) {
    if (error.status === 403) {
      return throwError(new Forbidden(error.error.message));
    }
    if (error.status === 500) {
      return throwError(new InternalServer(error.error.message));
    }
    if (error.status === 401) {
      return throwError(new Unauthorized(error.error.message));
    }
    if ( error.status === 409) {
      return throwError (new Duplicate(error.error.message));
    }
    if ( error.status === 404) {
      return throwError (new NotFound(error.error.message));
    }
    return throwError(new AppErrors(error.error.message));
  }

  getJobsOfCompany(companyId: string, size: number, page: number) {
    return this.http.get('/companies/'+ companyId + '/jobs', {params: {
                                                                'size': size.toString(),
                                                                'page': page.toString() }}
                    )
                    .pipe(
                      map((response:any) => response),
                      catchError(this.handleError)
                    )
  }

  getCandidateForJob(jobId: string, page: number = 0) {
    let params = new HttpParams(); 
    params.append('page', page.toString());
    return this.http.get('/jobs/'+ jobId + '/applications', {params: params})
                    .pipe(
                      map((response:any) => response),
                      catchError(this.handleError)
                    )
  }

  getHotJob() {
    return this.http.get('/hotjobs')
                    .pipe(
                      map(response => response),
                      catchError(this.handleError)
                    )
  }

  sendContactAdmin(params: any) {
    return this.http.post('/contact', params)
      .pipe(
        map((respone: any) => respone))
  }

  getCompanyJobs(params: HttpParams) {
    return this.http.get('/jobs/', { params} )
      .pipe(
        map((response:any) => response),
        catchError(this.handleError)
      )
  }
  getCountJobs() {
    return this.http.get('/jobs/count')
    .pipe(
      map( response => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
  getListByTime(params:HttpParams) {
    return this.http.get('/jobs/list-by-time',{params})
    .pipe(
      map((response:any)=>response),
      catchError(this.handleError)
    )
  }

  registerHotJob(jobId: number) {
    const requestBody = { jobId: jobId};
    return this.http.post('/hotjobs', requestBody)
    .pipe(
      map((response: any) => response)
    )
  }
  
  editJob (jobId: number,params: HttpParams) {
    console.log(params)
    return this.http.put('/my-jobs/'+jobId, params)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }
  deleteJob (jobId: number) {
    return this.http.delete('/jobs/'+jobId)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }
}
