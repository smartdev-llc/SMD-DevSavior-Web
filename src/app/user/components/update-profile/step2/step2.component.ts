import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import * as moment from 'moment';
import { StudentUserService } from '../../../services/student-user.serivce';
import { fromToMothDifference } from '../../../validators/from-to-moth-difference.validator';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ModalDirective } from 'ngx-bootstrap';
import { AppErrors } from '../../../../core/error/app-errors';
import { from } from 'rxjs';
import { filter, toArray, map } from 'rxjs/operators';
import { EducationDegrees } from '../../../../core/models/student-profile';

@Component({
  selector: 'update-profile-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class UpdateProfileStep2Component implements OnInit {

  @ViewChild('deleteEducationDialog') deleteEducationDialog: ConfirmDialogComponent;
  @ViewChild('eduHistoryModal') eduHistoryModal: ModalDirective;
  studyTimeAt: FormGroup;
  educationDegreesFormGroup: FormGroup;
  isSubmittingEducation: boolean = false;
  isDeletingWorkingEducation: boolean = false;
  submittedEducation: boolean = false;
  educationDegrees: Array<any> = null;
  educationIdSelected: any;
  educationLang: any = {};

  qualifications: Array<any>  = [];

  classificationOfDegrees: Array<any>  = [];

  constructor(
    private formBuilder: FormBuilder,
    private studentUserService: StudentUserService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    // translate for ng select qualifications and classificationOfDegrees
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const { education } = event.translations;
      this.translateEducationSelect(education);
    });
  }

  ngOnInit() {
    this.translate.get('education').subscribe((educations: string) => {
      this.translateEducationSelect(educations);
    });
    this.initForms();
    this.preLoadData();
  }

  initForms(): void {
    this.studyTimeAt = this.formBuilder.group({
      fromMonth: [''],
      toMonth: ['']
    }, {
      validator: fromToMothDifference
    });

    this.educationDegreesFormGroup = this.formBuilder.group({
      idEducation: [''],
      university: ['', Validators.required],
      major: ['', Validators.required],
      degreeType: [null, Validators.required],
      degreeClassification: [null, Validators.required],
      additionalInformation: [''],
      studyTimeAt: this.studyTimeAt
    });
  }

  preLoadData(): void {
    this.studentUserService.getMyProfile()
      .subscribe(res => {
        this.educationDegrees = res.educationDegrees;
      })
  }

  educationDegreesSubmit(): void {
    this.submittedEducation = true;
    if (this.educationDegreesFormGroup.invalid) {
      return;
    }

    const { fromMonth, toMonth } = this.studyTimeAt.value;
    const params = {
      ...this.educationDegreesFormGroup.value,
      fromMonth: this.partMonthYearFromDateObj(fromMonth),
      toMonth: this.partMonthYearFromDateObj(toMonth, true)
    };

    const { idEducation } = this.educationDegreesFormGroup.value;
    delete params.studyTimeAt;
    delete params.idEducation;

    this.isSubmittingEducation = true;
    if (idEducation) {
      this.updateEducationDegrees(params, idEducation);
    } else {
      this.createEducationDegrees(params);
    }

  }

  createEducationDegrees(params: any): void {
    this.studentUserService.createEducationDegrees(params)
    .subscribe(res => {
      this.isSubmittingEducation = false;
      this.submittedEducation = false;
      this.resetEducationForm();
      this.showEducationSuccess();
      this.eduHistoryModal.hide();
      this.educationDegrees.push(res);
    },
    (error: AppErrors) => {
      this.isSubmittingEducation = false;
      this.showEducationError(error);
    });
  }

  updateEducationDegrees(params: any, id: any): void {
    this.studentUserService.updateEducationDegrees(params, id)
    .subscribe(res => {
      this.isSubmittingEducation = false;
      this.submittedEducation = false;
      this.resetEducationForm();
      this.showEducationSuccess();
      this.eduHistoryModal.hide();
      from(this.educationDegrees)
        .pipe(
          map(item => {
            if (item.id === res.id) return res;
            return item;
          }),
          toArray()
        )
        .subscribe(value => this.educationDegrees = value);
    },
    (error: AppErrors) => {
      this.isSubmittingEducation = false;
      this.showEducationError(error);
    });
  }

  deleteEducationDegrees(id: any): void {
    this.deleteEducationDialog.openModal();
    this.educationIdSelected = id;
  }

  editEducationDegrees(education: any): void {
    const educationDegrees = new EducationDegrees().deserialize(education);
    this.educationDegreesFormGroup.setValue(educationDegrees);
    this.eduHistoryModal.show();
  }

  handleConfirm(isConfirm: boolean) {
    if (isConfirm) {
      this.isDeletingWorkingEducation = true;
      this.studentUserService.deleteEducationDegrees(this.educationIdSelected)
        .subscribe(res => {
          from(this.educationDegrees)
            .pipe(
              filter((item) => item.id !== this.educationIdSelected),
              toArray()
            ).subscribe(val => {
              this.educationDegrees = val || [];
            });
          this.isDeletingWorkingEducation = false;
          this.showEducationSuccess();
        },
        (error: AppErrors) => {
          this.isDeletingWorkingEducation = false;
          this.showEducationError(error);
        });
    }
  }

  get edF() {
    return this.educationDegreesFormGroup.controls;
  }

  get stF() {
    return this.studyTimeAt.controls;
  }

  openModalCreateNew() {
    this.educationDegreesFormGroup.reset();
    this.eduHistoryModal.show();
  }

  resetEducationForm() {
    this.educationDegreesFormGroup.reset();
  }

  showEducationSuccess() {
    this.toastr.success('Your changes have been saved', 'Education');
  }

  showEducationError(error: any) {
    this.toastr.error('Something went wrong please try again later', 'Education');
  }

  private partMonthYearFromDateObj(date: Date, isToMonth: boolean = false) {
    if (!moment(date).isValid() && isToMonth) {
      return 'NOW';
    }
    return moment(date).format('MM-YYYY');
  }

  private translateEducationSelect(education: any): void {
    this.qualifications  = [
      { id: 'HIGH_SCHOOL', name: education.highSchool },
      { id: 'ASSOCIATE_DEGREE', name: education.associateDegree },
      { id: 'COLLEGE', name: education.college },
      { id: 'BACHELOR', name: education.bachelors },
      { id: 'MASTERS', name: education.masters },
      { id: 'DOCTORATE', name: education.doctorate }
    ];

    this.classificationOfDegrees = [
      { id: 'AVERAGE', name: education.average },
      { id: 'GOOD', name: education.good },
      { id: 'EXCELLENT', name: education.excellent }
    ];
  }

}
