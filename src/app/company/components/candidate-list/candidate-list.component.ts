import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../core/services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../layout/services/language.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent implements OnInit {
  static readonly NO_SPECIFIC_JOB_ID = 'all';
  candidates: any[];
  isLoading: boolean;
  jobs: any[];
  currentJob: any;
  paginationInfo: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
  };

  constructor(
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private languageService: LanguageService,
    private router: Router
  ) {
    const jobId = this.activatedRoute.snapshot.paramMap.get('jobId');
    this.currentJob = { id: jobId };
  }

  ngOnInit() {
    this.isLoading = true;
    if (this.currentJob.id) {
      this.loadJobs();
      this.loadCandidateForJob();
    } else {
      this.router.navigate(['/not-found']);
    }
  }

  getCandidateAtPage(page: number = 0) {
    this.isLoading = true;
    this.candidates = [];
    this.jobService.getCandidateForJob(this.currentJob.id, page).subscribe(
      response => {
        this.candidates = response.list;
        this.paginationInfo = {
          totalItems: response.total,
          itemsPerPage: response.size,
          currentPage: response.page
        };
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  onPageChanged(page: number) {
    this.getCandidateAtPage(page);
  }

  loadCandidateForJob(job: any = this.currentJob, page?: number) {
    if (this.currentJob.id != CandidateListComponent.NO_SPECIFIC_JOB_ID) {
      this.updateInfoCurrentJob(job);
      if (this.isNoInfoCurrentJob(job.title)) {
        this.loadInfoOfCurrentJob();
      } else {
        this.currentJob.title = job.title;
      }
      this.getCandidateAtPage(page);
    }
  }

  updateInfoCurrentJob(job) {
    this.currentJob = job;
  }

  isNoInfoCurrentJob(jobTitle: string) {
    return jobTitle == undefined;
  }

  loadInfoOfCurrentJob() {
    this.jobService.getDetailJob(this.currentJob.id).subscribe(response => {
      this.currentJob = response;
    });
  }

  loadJobs() {
    const params: HttpParams = new HttpParams({ fromObject: {'status': 'ACTIVE' }});
    this.jobService.getCompanyJobs(params).subscribe(
      response => {
        this.jobs = response.list;
        if (
          this.currentJob.id === CandidateListComponent.NO_SPECIFIC_JOB_ID &&
          this.jobs &&
          this.jobs[0]
        ) {
          this.currentJob = this.jobs[0];
          this.loadCandidateForJob();
        }
      },
      error => {

      }
    );
  }

  get hasCandidates() {
    return this.candidates && this.candidates.length;
  }
}
