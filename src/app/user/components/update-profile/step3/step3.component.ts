import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { StudentUserService }  from '../../../services/student-user.serivce';
import { ToastrService } from 'ngx-toastr';
import { AppErrors } from '../../../../core/error/app-errors';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'update-profile-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class UpdateProfileStep3Component implements OnInit {

  @ViewChild('keySkillsModal') keySkillsModal: ModalDirective;
  skillsFormGroup: FormGroup;
  skillInput: string = '';
  skillsSummiting: boolean = false;
  currentSkills: Array<any> = null;

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
    this.skillsFormGroup = this.formBuilder.group({
      skills: new FormArray([])
    });
  }

  get skills(): FormArray { return this.skillsFormGroup.get('skills') as FormArray; }

  preLoadData(): void {
    this.studentUserService.getMyProfile()
      .subscribe(res => {
        this.currentSkills = res.skills;
        this.skillsFormGroup.setControl('skills',  this.formBuilder.array(res.skills));
      })
  }

  onSubmitSkills() {
    this.skillsSummiting = true;
    this.studentUserService.updateSkills(this.skillsFormGroup.value)
      .subscribe(res => {
        this.skillsSummiting = false;
        this.showSkillsSuccess();
        this.currentSkills = res.skills;
        this.keySkillsModal.hide();
      },
      (error: AppErrors) => {
        this.skillsSummiting = false;
        this.showSkillsError(error);
      });
  }

  handleRemoveSkill(index) {
    this.skills.removeAt(index);
  }

  handleAddSkill(event) {
    if (this.skillInput) {
      this.skills.push(new FormControl(this.skillInput));
      this.skillInput = '';
    }
    return false;
  }

  showSkillsSuccess() {
    this.toastr.success('Your changes have been saved', 'Update Skills');
  }

  showSkillsError(error: any) {
    this.toastr.error('Something went wrong please try again later', 'Update Skills');
  }
}
