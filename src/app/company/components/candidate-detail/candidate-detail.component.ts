import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CandidateService} from '../../../core/services/candidate/candidate.service';
import {Candidate} from '../../../core/models/candidate';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})

//TODO: Add handling error in service
//TODO: Make beter good looking for UI
export class CandidateDetailComponent implements OnInit {

  isLoading = true;
  candidate: Candidate;
  constructor(private activatedRoute: ActivatedRoute,
              private candidateService: CandidateService) { }

  ngOnInit() {
    let jobId =this.activatedRoute.snapshot.paramMap.get('jobId');
    let candidateId = this.activatedRoute.snapshot.paramMap.get('candidateId');

      this.candidateService.getCandidate(jobId, candidateId).subscribe((response: Candidate) => {
        this.isLoading = false;
        this.candidate = response;
          console.log('response', this.candidate);
      });
  }

}
