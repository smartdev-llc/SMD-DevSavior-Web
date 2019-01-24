import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { CategoryCompanyService } from '../../../core/services/category/CategoryCompanyService';
import { PostJobCompanyService } from '../../../core/services/post-job/PostJobCompanyService';
import { SkillService } from '../../../core/services/skill/SkillService';
import { ActivatedRoute, Router } from '@angular/router';
import { AppErrors } from '../../../core/error/app-errors';
import { switchMap } from 'rxjs/operators';
import {JobService} from '../../../core/services/job.service';
import { salaryDifference } from '../../validators/salary-difference.validator';
import {InternalServer} from '../../../core/error/internal-server';
import {Duplicate} from '../../../core/error/duplicate';
import {Forbidden} from '../../../core/error/forbidden';
import {NotFound} from '../../../core/error/not-found';
import {Unauthorized} from '../../../core/error/unauthorized';

@Component({
  selector: 'edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],

      [{ 'list': 'ordered' }, { 'list': 'bullet' }],

      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],
      ['blockquote'],

      ['link']
    ]
  };

  job:any;
  submitted = false;
  isSubmitting = false;
  salaryForm: FormGroup;
  postAJobForm: FormGroup;
  listSkills: Array<any> = [];
  listSkillsId: Array<any> = [];
  jobTypeList: Array<any>  = [];
  jobCategories: Array<any> = [];

  constructor(
    private categoryService: CategoryCompanyService,
    private jobService: PostJobCompanyService,
    private jobsService: JobService,
    private skillService: SkillService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // translate for ng select qualifications and classificationOfDegrees
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const { jobType } = event.translations;
      this.translatejobTypesSelect(jobType);
    });
  }

  ngOnInit() {
    // this.jobId = this.route.snapshot.paramMap.get('id');
    this.route.paramMap.pipe(
        switchMap(route =>
           this.jobsService.getDetailJob(route.get('id'))
        )
      ).subscribe(data => {
        this.job =  data;
        console.log(this.job);
      },(error: AppErrors) => this.handleErrorJobDetailComponent(error));

    this.translate.get('jobType').subscribe((jobTypes: any) => {
      this.translatejobTypesSelect(jobTypes);
    });

    this.skillService.getAll().subscribe(response => {
      this.listSkills = response as Array<any>;
      this.listSkillsId =['1','3','17']
    });

    
    this.categoryService.getAll().subscribe(response => {
      this.jobCategories = response as Array<any>;
    });
    this.initPostJobForm();

  }

  get f() {
    return this.postAJobForm.controls;
  }

  get salaryF() {
    return this.salaryForm.controls;
  }

  resetForm() {
    this.postAJobForm.reset();
  }

  showSuccess() {
    this.toastr.success('Your job was successfully edited', 'Edit job');
  }

  showError(error) {
    this.toastr.error('Something went wrong please try again later', 'Edit job');
  }

  initPostJobForm() {
    this.salaryForm = this.formBuilder.group({
      fromSalary: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      toSalary: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]]
    }, {
      validator: salaryDifference
    });

    this.postAJobForm = this.formBuilder.group({
      title: ['', Validators.required],
      skillIds: [null, Validators.required],
      categoryId: [null, Validators.required],
      jobType: [null, Validators.required],
      description: ['', Validators.required],
      requirements: ['', Validators.required],
      benefits: [''],
      salaryForm: this.salaryForm
    });
  }

  onSubmitEditJob() {
    this.submitted = true;
    if (this.postAJobForm.invalid) {
      return;
    }

    let { salaryForm: { fromSalary, toSalary } } = this.postAJobForm.value;

    const params = {
      ...this.postAJobForm.value,
      fromSalary: Number(fromSalary),
      toSalary: Number(toSalary)
    };
    delete params.salaryForm;
    console.log(this.job.id)
    this.isSubmitting = true;
    this.jobsService.editJob(this.job.id ,params)
      .subscribe((response) => {
        this.isSubmitting = false;
        this.submitted = false;
        this.resetForm();
        this.showSuccess();
        this.router.navigateByUrl('/jobs/'+this.job.id);
      },
      (error: AppErrors) => {
        this.isSubmitting = false;
        this.showError(error);
      });
  }

  private translatejobTypesSelect(jobTypes: any): void {
    this.jobTypeList = [
      { value: 'FULL_TIME', name: jobTypes.fullTime },
      { value: 'PART_TIME', name: jobTypes.partTime },
      { value: 'CONTRACT', name: jobTypes.contract },
      { value: 'INTERNSHIP', name: jobTypes.internship }
    ];
  }

  handleErrorJobDetailComponent(error: AppErrors) {
    if (error instanceof InternalServer) {
    }
    else if (error instanceof Unauthorized) {
    }
    else if (error instanceof Forbidden) {
    }
    else if (error instanceof Duplicate) {
    }
    else if (error instanceof NotFound) {
      this.router.navigate(['not-found']);
    }
    else {
      throw error;
    }
  }
}
