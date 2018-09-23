import { Component, OnInit } from '@angular/core';
import {CategoryCompanyService} from '../../../core/services/category/CategoryCompanyService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostJobCompanyService} from '../../../core/services/post-job/PostJobCompanyService';
import {SkillService} from '../../../core/services/skill/SkillService';

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

  constructor(private categoryService: CategoryCompanyService,
              private jobService: PostJobCompanyService,
              private skillService: SkillService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    // Get List Category
    this.categoryService.getAll().subscribe(
      (listCategory: Category[]) => {
        this.categories = listCategory;
        console.log('data', this.categories);
      }
    );

    // Get list Skill
    this.skillService.getAll().subscribe(
      (listSkill: Skill[]) => {
        this.skills = listSkill;
        console.log('list Skill', listSkill);
      }
    );

    // Initialize Form Group
    this.postJobForm = this.formBuilder.group({
      'title': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'categoryId': ['', [Validators.required]]
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

  submitPostJobForm(){

    if( this.postJobForm.invalid){
      this.submitted = true;
      console.log('Failed: form submision', this.postJobForm);
    }else{
      this.jobService.createData(this.postJobForm.value).subscribe( data => {
        console.log('data', data);
      });
      console.log('Success: form submision', this.postJobForm.value);
    }

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
