import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { from } from 'rxjs';
import { filter, toArray } from 'rxjs/operators';
import { AppErrors } from '../../../core/error/app-errors';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { StudentUserService } from '../../services/student-user.serivce';

@Component({
  selector: 'notification-jobs',
  templateUrl: './notification-jobs.component.html',
  styleUrls: ['./notification-jobs.component.scss']
})
export class NotificationJobs implements OnInit {
  @ViewChild('deleteSkillDialog') deleteSkillDialog: ConfirmDialogComponent;
  @ViewChild('notificationAlert') notificationAlert: ModalDirective;
  modalRef: BsModalRef;
  skillFormGroup: FormGroup;
  skillSubscription: Array<any> = [];
  advancedSkills: Array<any> = [];
  isSubmittingSkill: boolean = false;
  isDeletingSkillWorking: boolean = false;
  submittedSkill: boolean = false;
  skillIdSelected: any;

  constructor(
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private studentUserService: StudentUserService,
    private toastr: ToastrService) 
    {
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        const { studentSkill } = event.translations;
    });
  }

  ngOnInit() {
    this.studentUserService.getSkills()
    .subscribe(
      studentSkills => {
        this.advancedSkills = studentSkills
      }
    )
    this.initForms();
    this.preLoadData();
  }

  initForms(): void {
    this.skillFormGroup = this.formBuilder.group({
      idSkill: ['', Validators.required],
      nameSkill: [''],
      createdAt: ['']
    });
  }

  preLoadData(): void{
    this.studentUserService.getSkillSubscription()
      .subscribe(res => {
          this.skillSubscription = res;
        }
      )
  }

  skillSubmit(): void {
    this.submittedSkill = true;
    if(this.skillFormGroup.invalid){
      return;
    }
    const params = {
      ...this.skillFormGroup.value
    };
    const { idSkill } = this.skillFormGroup.value;

    this.isSubmittingSkill = true;
    this.updateSkill(idSkill);
  }

  updateSkill(idSkill: any): void {
    this.studentUserService.updateSkill(idSkill)
    .subscribe(response => {
      this.isSubmittingSkill = false;
      this.submittedSkill = false;
      this.resetSkillForm();
      this.showSkillSuccess();
      this.notificationAlert.hide();
      this.skillSubscription.push(response);
    },
    (error: AppErrors) => {
      this.isSubmittingSkill = false;
      this.showSkillError(error);
    });
  }

  deleteSkill(id: any): void {
    this.deleteSkillDialog.openModal();
    this.skillIdSelected = id;
  }

  handleConfirm(isConfirm: boolean) {
    if (isConfirm) {
      this.isDeletingSkillWorking = true;
      this.studentUserService.deleteSkill(this.skillIdSelected)
        .subscribe(res => {
          from(this.skillSubscription)
            .pipe(
              filter((item) => item.id !== this.skillIdSelected),
              toArray()
            ).subscribe(val => {
              this.skillSubscription = val || [];
            });
          this.isDeletingSkillWorking = false;
          this.showSkillSuccess();
        },
        (error: AppErrors) => {
          this.isDeletingSkillWorking = false;
          this.showSkillError(error);
        });
    }
  }

  get sF(){
    return this.skillFormGroup.controls;
  }

  showSkillSuccess() {
    this.toastr.success('Your changes have been saved', 'Skill');
  }

  showSkillError(error: any) {
    this.toastr.error('Something went wrong please try again later', 'Skill');
  }

  resetSkillForm() {
    this.skillFormGroup.reset();
  }

  openModal() {
    this.skillFormGroup.reset();
    this.notificationAlert.show();
  }

  decline() {
    this.notificationAlert.hide();
  }

}
