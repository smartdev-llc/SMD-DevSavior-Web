import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StudentUserService } from '../../../services/student-user.serivce';
import { salaryDifference } from '../../../validators/salary-difference.validator';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { AppErrors } from '../../../../core/error/app-errors';
import { WorkingPreference } from '../../../../core/models/student-profile';

@Component({
  selector: 'update-profile-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class UpdateProfileStep4Component implements OnInit {

  workingPreferenceForm: FormGroup;
  salaryForm: FormGroup;
  submittedWorking: boolean = false;
  isSubmittingWorking: boolean = false;
  jobTypeList: Array<any>  = [];

  constructor(
    private formBuilder: FormBuilder,
    private studentUserService: StudentUserService,
    private toastr: ToastrService,
    private translate: TranslateService)
  {
    // translate for ng select qualifications and classificationOfDegrees
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const { jobType } = event.translations;
      this.translatejobTypesSelect(jobType);
    });
  }

  ngOnInit() {
    this.translate.get('jobType').subscribe((jobTypes: any) => {
      this.translatejobTypesSelect(jobTypes);
    });

    this.initForms();
    this.preLoadData();
  }

  initForms(): void {
    this.salaryForm = this.formBuilder.group({
      expectedSalaryFrom: [''],
      expectedSalaryTo: [''],
      isNegotiableSalary: [false]
    }, {
      validator: salaryDifference
    });

    this.workingPreferenceForm = this.formBuilder.group({
      preferredWorkingLocation: ['', Validators.required],
      willingToRelocate: [false],
      jobType: [null, Validators.required],
      careerObjectives: ['', Validators.required],
      salaryForm: this.salaryForm
    });
  }

  preLoadData(): void {
    this.studentUserService.getMyProfile()
      .subscribe(res => {
        const workingPreference = new WorkingPreference().deserialize(res.workingPreference[0]);
        this.workingPreferenceForm.setValue(workingPreference);
      })
  }

  workingPreferenceSubmit(): void {
    this.submittedWorking = true;
    if (this.workingPreferenceForm.invalid) {
      return;
    }

    const { expectedSalaryFrom, expectedSalaryTo, isNegotiableSalary } = this.salaryForm.value;
    const params = {
      ...this.workingPreferenceForm.value,
      expectedSalaryFrom,
      expectedSalaryTo,
      isNegotiableSalary
    };
    delete params.salaryForm;

    this.isSubmittingWorking = true;
    this.studentUserService.workingPreference(params)
      .subscribe(res => {
        this.isSubmittingWorking = false;
        this.submittedWorking = false;
        this.showWorkingSuccess();
      },
      (error: AppErrors) => {
        this.isSubmittingWorking = false;
        this.showWorkingError(error);
      })
  }

  get f() {
    return this.workingPreferenceForm.controls;
  }

  get salaryF() {
    return this.salaryForm.controls;
  }

  resetForm() {
    this.workingPreferenceForm.reset();
  }

  showWorkingSuccess() {
    this.toastr.success('Your changes have been saved', 'Working Preference');
  }

  showWorkingError(error: any) {
    this.toastr.error('Something went wrong please try again later', 'Working Preference');
  }

  private translatejobTypesSelect(jobTypes: any): void {
    this.jobTypeList = [
      { value: 'FULL_TIME', name: jobTypes.fullTime },
      { value: 'PART_TIME', name: jobTypes.partTime },
      { value: 'CONTRACT', name: jobTypes.contract },
      { value: 'INTERNSHIP', name: jobTypes.internship }
    ];
  }
}
