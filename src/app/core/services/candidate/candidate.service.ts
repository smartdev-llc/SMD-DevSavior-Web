import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class CandidateService {

    constructor(private http: HttpClient) {
    }

    getCandidate(jobId, candidateId){
      return this.http.get('/jobs/' + jobId + '/applications/' + candidateId);
    }

}
