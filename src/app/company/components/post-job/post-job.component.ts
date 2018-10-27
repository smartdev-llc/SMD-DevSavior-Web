import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CategoryCompanyService } from '../../../core/services/category/CategoryCompanyService';
import { PostJobCompanyService } from '../../../core/services/post-job/PostJobCompanyService';
import { SkillService } from '../../../core/services/skill/SkillService';
import { Observable, from } from 'rxjs';
import { map, reduce, toArray } from 'rxjs/operators';
import { AppErrors } from '../../../core/error/app-errors';
import { salaryDifference } from '../../validators/salary-difference.validator';

@Component({
  selector: 'post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {

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

  jobTypeList: Array<any>  = [
    { value: 'FULL_TIME', name: 'Full time' },
    { value: 'PART_TIME', name: 'Part time' },
    { value: 'CONTRACT', name: 'Contract' },
    { value: 'INTERNSHIP', name: 'Internship' }
  ];

  submitted = false;
  isSubmitting = false;
  listSkills: Array<any> = [];
  jobCategories: Array<any> = [];
  postAJobForm: FormGroup;
  salaryForm: FormGroup;

  constructor(
    private categoryService: CategoryCompanyService,
    private jobService: PostJobCompanyService,
    private skillService: SkillService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.skillService.getAll().subscribe(response => {
      this.listSkills = response as Array<any>;
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
    this.toastr.success('Your job was successfully posted', 'Post job');
  }

  showError(error) {
    this.toastr.error('Something went wrong please try again later', 'Post job');
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
      benefits: ['', Validators.required],
      salaryForm: this.salaryForm
    });
  }

  onSubmitPostJob() {
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

    this.isSubmitting = true;
    this.jobService.createData(params)
      .subscribe((response) => {
        this.isSubmitting = false;
        this.submitted = false;
        this.resetForm();
        this.showSuccess();
      },
      (error: AppErrors) => {
        this.isSubmitting = false;
        this.showError(error);
      });
  }
}
