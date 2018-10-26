import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentUserService } from '../../../services/student-user.serivce';
import { ToastrService } from 'ngx-toastr';
import { AppErrors } from '../../../../core/error/app-errors';
import { ModalDirective } from 'ngx-bootstrap';
import { filter, toArray, map } from 'rxjs/operators';
import { from } from 'rxjs';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import * as moment from 'moment';
import { fromToMothDifference } from '../../../validators/from-to-moth-difference.validator';
import { TimeWorkingAt, WorkingExperience } from '../../../../core/models/student-profile';

@Component({
  selector: 'update-profile-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss']
})
export class UpdateProfileStep5Component implements OnInit {

  @ViewChild('deleteWorkingDialog') deleteWorkingDialog: ConfirmDialogComponent;
  @ViewChild('eplHistoryModal') eplHistoryModal: ModalDirective;
  workingExperienceFormGroup: FormGroup;
  timeWorkingAt: FormGroup;
  isSubmittingWorking: boolean = false;
  isDeletingWorking: boolean = false;
  submittedWorking: boolean = false;
  workingExperiences: Array<any> = null;
  workingIdSelected: any;

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
    this.timeWorkingAt = this.formBuilder.group({
      fromMonth: [''],
      toMonth: [''],
      isCurrentJob: [false]
    }, {
      validator: fromToMothDifference
    });

    this.workingExperienceFormGroup = this.formBuilder.group({
      idWorking: [''],
      jobTitle: ['', Validators.required],
      company: ['', Validators.required],
      additionalInformation: [''],
      timeWorkingAt: this.timeWorkingAt
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
    if (this.workingExperienceFormGroup.invalid) {
      return;
    }

    const { fromMonth, toMonth } = this.timeWorkingAt.value;
    const params = {
      ...this.workingExperienceFormGroup.value,
      fromMonth: this.partMonthYearFromDateObj(fromMonth),
      toMonth: this.partMonthYearFromDateObj(toMonth, true)
    };

    const { idWorking } = this.workingExperienceFormGroup.value;
    delete params.timeWorkingAt;
    delete params.idWorking;

    this.isSubmittingWorking = true;
    if (idWorking) {
      this.updateWorkingExperience(params, idWorking);
    } else {
      this.createWorkingExperience(params);
    }
  }

  createWorkingExperience(params): void {
    this.studentUserService.createWorkingExperience(params)
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

  updateWorkingExperience(params: any, id: any): void {
    this.studentUserService.updateWorkingExperience(params, id)
      .subscribe(res => {
        this.isSubmittingWorking = false;
        this.submittedWorking = false;
        this.resetWorkingForm();
        this.showWorkingSuccess();
        this.eplHistoryModal.hide();
        from(this.workingExperiences)
          .pipe(
            map(item => {
              if (item.id === res.id) return res;
              return item;
            }),
            toArray()
          )
          .subscribe(value => this.workingExperiences = value);
      },
      (error: AppErrors) => {
        this.isSubmittingWorking = false;
        this.showWorkingError(error);
      });
  }

  deleteWorkingExperience(id: any): void {
    this.deleteWorkingDialog.openModal();
    this.workingIdSelected = id;
  }

  editWorkingExperience(working: any): void {
    const workingExperience = new WorkingExperience().deserialize(working);
    this.workingExperienceFormGroup.setValue(workingExperience);
    this.eplHistoryModal.show();
  }

  handleConfirm(isConfirm: boolean) {
    if (isConfirm) {
      this.isDeletingWorking = true;
      this.studentUserService.deleteWorkingExperience(this.workingIdSelected)
        .subscribe(res => {
          from(this.workingExperiences)
            .pipe(
              filter((item) => item.id !== this.workingIdSelected),
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
  }

  openModalCreateNew() {
    this.workingExperienceFormGroup.reset();
    this.eplHistoryModal.show();
  }

  get weF() {
    return this.workingExperienceFormGroup.controls;
  }

  get twaF() {
    return this.timeWorkingAt.controls;
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

  private partMonthYearFromDateObj(date: Date, isToMonth: boolean = false) {
    if (!moment(date).isValid() && isToMonth) {
      return 'NOW';
    }
    return moment(date).format('MM-YYYY');
  }
}
