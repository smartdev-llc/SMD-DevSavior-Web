import { Injectable, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpEvent,
  HttpParams
} from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';

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
    )
  }

  searchJobs(params: HttpParams) {
    return this.http.get('/jobs/search', { params })
    .pipe(
      map((response: any) => response),
    )
  }
}
