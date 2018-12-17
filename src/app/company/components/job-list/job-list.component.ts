import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ActivatedRoute, } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { JobService } from '../../../core/services/job.service';
import { AuthService } from '../../../core/services/auth.service';

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
  key = this.route.snapshot.paramMap.get('type');
  typeJobs: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService,
    private scrollToService: ScrollToService,
    
  ) { }

  ngOnInit() {
    
    switch (this.key) {
      case 'active':
      case 'expires':
      case 'expired':
        this.getListByTime(this.key);
        break;
      case 'all':
        this.getListCompanyJobs();
        break;
      default:
        this.router.navigate(['/not-found']);
        break;
    }
    this.jobService.getCountJobs().subscribe(data => {
      this.typeJobs = data;
    })
    
  }

  getListCompanyJobs() {
    const params = new HttpParams({ fromObject: this.queryParams });
    this.jobService.getCompanyJobs(params)
      .subscribe(value => {
        this.totalItems = value.length;
        this.queryParams = {
          size: this.itemsPerPage,
          page: 0,
          ...this.queryParams
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
    }, error => {
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

  convertTimeStampToDate(date: number) {
    return new Date(date).toDateString();
  }

  // Since backend still not write API to get expire date then setting it after the created date 7 days as default
  // This should be removed after intergrate API
  getExpiredDate(createDate: number) {
    var date = new Date(this.convertTimeStampToDate(createDate));
    var expireDate = date.setDate(date.getDate() + 7);
    return new Date(expireDate).toDateString();
  }
  getListByTime(key){
      this.queryParams = {
        size: this.itemsPerPage,
        page: 0,
        type: key,
        ...this.queryParams
      };
      const params = new HttpParams({ fromObject: this.queryParams });
        this.jobService.getListByTime(params)
          .subscribe(value => {
            this.listCompanyJobs = value.list;
            this.loading = false;
            // console.log(this.listCompanyJobs)
          }, error => {
            this.loading = false;
            this.formErrorMessage = error.message;
          });
    
  }
}
