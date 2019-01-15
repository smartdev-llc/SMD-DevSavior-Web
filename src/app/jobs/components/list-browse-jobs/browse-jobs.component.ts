import { Injectable, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

import { Categories } from '../../../core/models/job';
import { JobService } from '../../../core/services/job.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  jobsTitle: Array<any> = [];
  loading = false;
  configDropDown = {
    displayKey: 'name',
    bindValue: 'id',
    placeholder: 'Select'
  };

  jobTypesArr: Array <any> = [
    { name: 'FULL TIME', id: 'FULL_TIME' },
    { name: 'PART TIME', id: 'PART_TIME' },
    { name: 'CONTRACT', id: 'CONTRACT' },
    { name: 'INTERSHIP', id: 'INTERSHIP' },
    { name: 'FREELANCE', id: 'FREELANCE' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private scrollToService: ScrollToService) {
  }

  ngOnInit() {
    this.route.data.subscribe(({ jobCategories }) => {
      jobCategories.unshift({
        id: '',
        name: 'All categories'
      });
      this.jobCategories = jobCategories;
    });

    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
    });

    this.initSearcForm();

    this.loadJobs();

    this.handleValueChangesForm();
  }

  initSearcForm() {
    const { category, qs, location, jobTypes } = this.queryParams;

    // Init jobTypes FormArray from queryParams
    const jobTypesParams: Array<string> = jobTypes || [];
    const controlsJobTypes = this.jobTypesArr.map((jobType, index) => {
      let value: boolean = false;
      if (jobTypesParams.indexOf(jobType.id) > -1) {
        value = true;
      }
      return new FormControl(value);
    });

    this.searchJobForm = this.formBuilder.group({
      category: category || '',
      qs: qs || '',
      location: location || '',
      jobTypes: new FormArray(controlsJobTypes)
    });
  }

  get jobTypes(): FormArray { return this.searchJobForm.get('jobTypes') as FormArray; }

  onSubmitSearch(): void {
    const jobTypes = this.getJobTypesValue();
    const { category, location, qs } = this.searchJobForm.value
    this.queryParams = {
      category: category,
      location: location ? location : '',
      qs: qs ? qs : '',
      jobTypes
    }
    this.router.navigate(['/browse-jobs'], { queryParams: this.queryParams, queryParamsHandling: 'merge', replaceUrl: true });
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobsTitle = this.queryParams.qs && this.queryParams.qs.split('-') || '';
    this.queryParams = {
      size: this.itemsPerPage,
      page: 0,
      ...this.queryParams,
      qs: this.jobsTitle
    };
    const params = new HttpParams({ fromObject: this.queryParams });
    this.loading = true;
    this.jobService.searchJobs(params).subscribe(value => {
      this.listJobs = value.list;
      this.totalItems = value.total;
      this.loading = false;
    });
  }

  handleValueChangesForm(): void {
    this.searchJobForm.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(values => {
      this.onSubmitSearch();
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

  private getJobTypesValue(): Array <any> {
    const selectedJobTypesIds = this.searchJobForm.value.jobTypes
      .map((v, i) => v ? this.jobTypesArr[i].id : null)
      .filter(v => v !== null);

    return selectedJobTypesIds;
  }
}
