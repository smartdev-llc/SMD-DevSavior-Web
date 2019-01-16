import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ActivatedRoute, } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { JobService } from '../../../core/services/job.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  queryParams: any = {};
  listCompanyJobs: Array<any> = [];
  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  loading = false;
  formErrorMessage: string;
  status = this.route.snapshot.paramMap.get('type');
  typeJobs: any;
  isProcessingHotJob = true;
  processingPendingJobId: number;
  hotJobs: Map<HotJobStatus, any> = new Map();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private scrollToService: ScrollToService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      const status = params['type'];
      if(status != undefined) {
        this.status = status;
        this.updateJobByStatus();
      }
    })
    this.jobService.getCountJobs().subscribe(data => {
      this.typeJobs = data;
    })
    this.getHotJob();
  }

  updateJobByStatus() {
    switch(this.status) {
      case 'ALL': 
        this.getListCompanyJobs();
        break;
      case 'HOTJOB': 
        this.getHotJob(true); 
        break;
      default: 
      this.getListJobByStatus(this.status); 
    }
  }

  getListCompanyJobs() {
    this.queryParams = {
      size: this.itemsPerPage,
      page: 0,
    };
    const params = new HttpParams({ fromObject: this.queryParams });
      this.jobService.getCompanyJobs(params)
        .subscribe(value => {
          this.listCompanyJobs = value.list;
          this.loading = false;
        }, error => {
          this.loading = false;
          this.formErrorMessage = error.message;
        });
  }

  pageChanged(event: any): void {
    this.queryParams = {
      size: this.itemsPerPage,
      page: event.page - 1
    };
    const params = new HttpParams({ fromObject: this.queryParams });
    this.jobService.getCompanyJobs(params)
      .subscribe(value => {
        this.listCompanyJobs = value;
        this.loading = false;
      }, error => {
        this.loading = false;
        this.formErrorMessage = error.message;
      });
    this.scrollToService.scrollTo({ target: 'listJobs' });
  }

  getListJobByStatus(status){
      this.queryParams = {
        size: this.itemsPerPage,
        page: 0,
        status: status
      };
      const params = new HttpParams({ fromObject: this.queryParams });
        this.jobService.getCompanyJobs(params)
          .subscribe(value => {
            this.listCompanyJobs = value.list;
            this.loading = false;
          }, error => {
            this.loading = false;
            this.formErrorMessage = error.message;
          });
    
  }

  registerHotJob(job: any) {
    if(this.isProcessingHotJob) {
      return;
    }
    this.isProcessingHotJob = true;
    this.processingPendingJobId = job.id;
    this.jobService.registerHotJob(job.id)
        .subscribe( response => {
          this.hotJobs.set(HotJobStatus.PENDING, job);
          this.toast.success('You\'ve just registered hot job successfully');
          this.isProcessingHotJob = false;
          this.processingPendingJobId = undefined;
        }, error => {
          this.toast.error('There is problem while register new hot job. Please try again!');
          this.isProcessingHotJob = false;
          this.processingPendingJobId = undefined;
        });
  }

  getHotJob(showJob = false) {
    this.isProcessingHotJob = true;
    this.jobService.getHotJob()
        .subscribe( response => {
          if(!Array.isArray(response)) {
            return;
          }
          if (showJob) {
            this.listCompanyJobs = [];
          }
          for(const job of response) {
            this.hotJobs.set(job.status, job.job);
            if(showJob) {
              this.listCompanyJobs.push(job.job);
            }
          }
          this.isProcessingHotJob = false;
        }, error => {
          this.isProcessingHotJob = false;
        });
  }

  ngAfterViewInit() {
    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }

  getHotJobStatus(job: any) {
    const statuses = Array.from(this.hotJobs.keys());
    for (const status of statuses) {
      if(this.hotJobs.get(status).id === job.id) {
        return status;
      }
  }
  }

  isHotJobRegistrable(job: any) {
    return job.status === 'ACTIVE' && 
      !this.hotJobs.get(HotJobStatus.PENDING) &&
      (!this.hotJobs.get(HotJobStatus.ACTIVE) || job.id != this.hotJobs.get(HotJobStatus.ACTIVE).id)
      && this.processingPendingJobId != job.id;
  }
}


enum HotJobStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE"
}