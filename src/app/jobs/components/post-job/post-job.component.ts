import {Component, OnInit} from '@angular/core';
import {CategoryCompanyService} from '../../../core/services/category/CategoryCompanyService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostJobCompanyService} from '../../../core/services/post-job/PostJobCompanyService';
import {SkillService} from '../../../core/services/skill/SkillService';
import {combineLatest, Observable} from 'rxjs';

@Component({
  selector: 'post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {
  categories: Category[];
  skills: Skill [];
  postJobForm: FormGroup;
  submitted: boolean;

  recievedSkill: Observable<any[]>;

  constructor(private categoryService: CategoryCompanyService,
              private jobService: PostJobCompanyService,
              private skillService: SkillService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    combineLatest([
      this.categoryService.getAll()
    ]).subscribe( response => {

      this.categories = response[0] as Category[];
      console.log('list category', response[0]);
    });

    this.recievedSkill = this.skillService.getAll() as Observable<Skill[]>;

    // Initialize Form Group
    this.postJobForm = this.formBuilder.group({
      'title': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'categoryId': ['', [Validators.required]],
    });

  }

  get title() {
    return this.postJobForm.get('title');
  }

  get description() {
    return this.postJobForm.get('description');
  }

  get categoryId() {
    return this.postJobForm.get('categoryId');
  }

  get skill() {
    return this.postJobForm.get('skill');
  }

  submitPostJobForm(){

    if( this.postJobForm.invalid){
      this.submitted = true;

      this.postJobForm.value['skillsIds'] = this.skills;
      console.log('Failed: form submision', this.postJobForm.value);
    }else {
      this.postJobForm['skillsIds'] = this.skills;
      console.log('Success: form submision', this.postJobForm.value);


      this.jobService.createData(this.postJobForm.value).subscribe( data => {
        console.log('data', data);
      });


    }

  }

  changeSelect (ngSelectObj){
    this.skills = this.getListSkillObject(ngSelectObj.itemsList.selectedItems);
  }

  getListSkillObject(listOptionSelected): Skill[] {
    let tempSkills = [];
    listOptionSelected.forEach((element, index) => {
      tempSkills.push(element.value.id);
    });

    return tempSkills;
  }

}

interface Category {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
}
interface Skill {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
}
