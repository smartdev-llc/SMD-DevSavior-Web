import { Injectable, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

import { Categories } from '../../../core/models/job';
import { JobService } from '../../../core/services/job.service';

@Component({
  selector: 'browse-jobs',
  templateUrl: './browse-jobs.component.html',
  styleUrls: ['./browse-jobs.component.scss']
})
export class BrowseJobsComponent implements OnInit {

  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  listJobs: Array<any> = [];
  searchJobForm: FormGroup;
  jobCategories: Array<Categories>;
  queryParams: any = {};
  loading = false;
  configDropDown = {
    displayKey: 'name',
    bindValue: 'id',
    placeholder: 'Select'
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private scrollToService: ScrollToService) {
  }

  ngOnInit() {
    this.route.data.subscribe(({ jobCategories }) => {
      this.jobCategories = jobCategories;
    });

    this.route.queryParams.subscribe(params => {
       this.queryParams = params;
    });

    this.initSearcForm();

    this.loadJobs();
  }

  initSearcForm() {
    const { category, qs, location } = this.queryParams;

    this.searchJobForm = this.formBuilder.group({
      'category': [category],
      'qs': [qs],
      'location': [location]
    });
  }

  selectionChanged($event:any) {
    // console.log($event);
  }

  onSubmitSearch(): void {
    const { category, location, qs } = this.searchJobForm.value
    this.queryParams = {
      category: category,
      location: location ? location : '',
      qs: qs ? qs : ''
    }
    this.router.navigate(['/browse-jobs'], { queryParams: this.queryParams, queryParamsHandling: 'merge', replaceUrl: true });
    this.loadJobs();
  }

  loadJobs(): void {
    this.queryParams = {
      size: this.itemsPerPage,
      page: 0,
      ...this.queryParams
    };
    const params = new HttpParams({ fromObject: this.queryParams });
    this.loading = true;
    this.jobService.searchJobs(params).subscribe(value => {
      this.listJobs = value.list;
      this.totalItems = value.total;
      this.loading = false;
    });
  }

  pageChanged(event: any): void {
    this.queryParams = {
      ...this.queryParams,
      page: event.page - 1
    };
    this.loadJobs();
    this.scrollToService.scrollTo({ target: 'searchJobs' });
  }
}
