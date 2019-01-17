import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { StudentUserService }  from '../../../services/student-user.serivce';
import { ToastrService } from 'ngx-toastr';
import { AppErrors } from '../../../../core/error/app-errors';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'update-profile-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class UpdateProfileStep3Component implements OnInit {

  @ViewChild('keySkillsModal') keySkillsModal: ModalDirective;
  skillsFormGroup: FormGroup;
  LanguagesFromGroup: FormGroup;
  skillInput: string = '';
  skillsSummiting: boolean = false;
  languagesSummiting: boolean = false;
  isAlreadyExistedKeySkill: boolean = false;
  currentSkills: Array<any> = null;

  languagesLevel: Array<any>  = [];

  constructor(
    private formBuilder: FormBuilder,
    private studentUserService: StudentUserService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    // translate for ng select qualifications and classificationOfDegrees
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const { language } = event.translations;
      this.translateLanguagesSelect(language);
    });
  }

  ngOnInit() {
    this.translate.get('language').subscribe((language: any) => {
      this.translateLanguagesSelect(language);
    });

    this.initForms();
    this.preLoadData();
  }

  initForms(): void {
    this.skillsFormGroup = this.formBuilder.group({
      skills: new FormArray([])
    });

    this.LanguagesFromGroup = this.formBuilder.group({
      ENGLISH: [null],
      FRENCH: [null],
      GERMAN: [null],
      SPANISH: [null],
      RUSSIAN: [null],
      KOREAN: [null],
      CHINESE: [null],
      JAPANESE: [null]
    });
  }

  private setControlSkillsFG(skills : Array<any>) {
    this.skillsFormGroup.setControl('skills',  this.formBuilder.array(skills));
  }

  get skills(): FormArray { return this.skillsFormGroup.get('skills') as FormArray; }

  preLoadData(): void {
    this.studentUserService.getMyProfile()
      .subscribe(res => {
        //init data for skill form
        this.currentSkills = res.skills;
        this.setControlSkillsFG(this.currentSkills);
        // init data for languages form
        if (res.languages && res.languages.length !== 0) {
          const languages = this.parseLanguages(res.languages);
          this.LanguagesFromGroup.setValue(languages);
        }
      });
  }

  onSubmitSkills(): void {
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

  onSubmitLanguages(): void {
    const params = this.converToNoLanguages(this.LanguagesFromGroup.value);

    this.languagesSummiting = true;
    this.studentUserService.updateLanguages(params)
      .subscribe(res => {
        this.languagesSummiting = false;
        this.showLanguagesSuccess();
      },
      (error: AppErrors) => {
        this.languagesSummiting = false;
        this.showLanguagesError(error);
      });
  }

  handleRemoveSkill(index): void {
    this.skills.removeAt(index);
  }

  handleAddSkill(event) {
    this.isAlreadyExistedKeySkill = false;

    if (this.skillInput) {
      const isIndexOfSkill = this.skills.value.indexOf(this.skillInput);
      if (isIndexOfSkill === -1) {
        this.skills.push(new FormControl(this.skillInput));
        this.skillInput = '';
      } else {
        this.isAlreadyExistedKeySkill = true;
      }
    }
    // To prevent submit form -> close modal
    return false;
  }

  handlerCloseSkillModal() {
    this.setControlSkillsFG(this.currentSkills);
  }

  showSkillsSuccess() {
    this.toastr.success('Your changes have been saved', 'Update Skills');
  }

  showSkillsError(error: any) {
    this.toastr.error('Something went wrong please try again later', 'Update Skills');
  }

  showLanguagesSuccess() {
    this.toastr.success('Your changes have been saved', 'Update Languages');
  }

  showLanguagesError(error: any) {
    this.toastr.error('Something went wrong please try again later', 'Update Languages');
  }

  private parseLanguages(languages: any): any {
    Object.keys(languages).forEach(function(key) {
      if (languages[key] === 'NO') {
        languages[key] = null;
      }
    });
    return languages;
  }

  private converToNoLanguages(languages: any): any {
    Object.keys(languages).forEach(function(key) {
      if (!languages[key]) {
        languages[key] = 'NO';
      }
    });
    return { languages };
  }

  private translateLanguagesSelect(language: any): void {
    this.languagesLevel = [
      { value: 'BEGINNER', name: language.beginner },
      { value: 'INTERMEDIATE', name: language.intermediate },
      { value: 'ADVANCED', name: language.advanced },
      { value: 'NATIVE', name: language.native }
    ];
  }
}
