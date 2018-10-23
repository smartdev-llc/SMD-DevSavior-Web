import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentUserService } from '../../../services/student-user.serivce';
import { ToastrService } from 'ngx-toastr';
import { AppErrors } from '../../../../core/error/app-errors';
import { ModalDirective } from 'ngx-bootstrap';
import { filter, toArray } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'update-profile-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss']
})
export class UpdateProfileStep5Component implements OnInit {

  @ViewChild('eplHistoryModal') eplHistoryModal: ModalDirective;
  workingExperienceFormGroup: FormGroup;
  isSubmittingWorking: boolean = false;
  isDeletingWorking: boolean = false;
  submittedWorking: boolean = false;
  workingExperiences: Array<any> = null;

  constructor(
    private formBuilder: FormBuilder,
    private studentUserService: StudentUserService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.initForms();
    this.preLoadData();
  }

  initForms(): void {
    this.workingExperienceFormGroup = this.formBuilder.group({
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      fromMonth: ['', Validators.required],
      toMonth: ['', Validators.required],
      additionalInformation: ['']
    });
  }

  preLoadData(): void {
    this.studentUserService.getMyProfile()
      .subscribe(res => {
        this.workingExperiences = res.workingExperiences;
      })
  }

  workingExperienceSubmit(): void {
    this.submittedWorking = true;
    console.log(this.workingExperienceFormGroup.value);
    if (this.workingExperienceFormGroup.invalid) {
      return;
    }

    this.isSubmittingWorking = true;
    this.studentUserService.createWorkingExperience(this.workingExperienceFormGroup.value)
      .subscribe(res => {
        this.isSubmittingWorking = false;
        this.submittedWorking = false;
        this.resetWorkingForm();
        this.showWorkingSuccess();
        this.eplHistoryModal.hide();
        this.workingExperiences.push(res);
      },
      (error: AppErrors) => {
        this.isSubmittingWorking = false;
        this.showWorkingError(error);
      });
  }

  deleteWorkingExperience(id: any): void {
    this.isDeletingWorking = true;
    this.studentUserService.deleteWorkingExperience(id)
      .subscribe(res => {
        from(this.workingExperiences)
          .pipe(
            filter((item) => item.id !== id),
            toArray()
          ).subscribe(val => {
            this.workingExperiences = val || [];
          });
        this.isDeletingWorking = false;
        this.showWorkingSuccess();
      },
      (error: AppErrors) => {
        this.isDeletingWorking = false;
        this.showWorkingError(error);
      });
  }

  editWorkingExperience(id: any): void {

  }

  get weF() {
    return this.workingExperienceFormGroup.controls;
  }

  resetWorkingForm() {
    this.workingExperienceFormGroup.reset();
  }

  showWorkingSuccess() {
    this.toastr.success('Your changes have been saved', 'Working Experience');
  }

  showWorkingError(error: any) {
    this.toastr.error('Something went wrong please try again later', 'Working Experience');
  }
}
