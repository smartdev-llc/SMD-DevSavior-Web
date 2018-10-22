import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
import { HttpParams } from '@angular/common/http';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  queryParams: any = {};
  listCompanyJobs: Array<any> = [];
  totalItems: number = 0;
  itemsPerPage: number = 4;
  currentPage: number = 0;
  loading = false;

  constructor(
    private Route: Router,
    private jobService: JobService,
    private scrollToService: ScrollToService
  ) { }

  ngOnInit() {
    this.getListCompanyJobs();
  }

  getListCompanyJobs() {
    this.queryParams = {
      size: this.itemsPerPage,
      page: 0,
      ...this.queryParams
    };
    const params = new HttpParams({ fromObject: this.queryParams });
    this.loading = true;
    this.jobService.getListCompanyJobs(params).subscribe(value => {
      this.listCompanyJobs = value;
      this.totalItems = value.length;
      this.loading = false;
    });
  }

  pageChanged(event: any): void {
    this.queryParams = {
      ...this.queryParams,
      page: event.page - 1
    };
    this.getListCompanyJobs();
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
}
