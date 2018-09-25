import {Component, OnInit} from '@angular/core';
import {CategoryCompanyService} from '../../../core/services/category/CategoryCompanyService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostJobCompanyService} from '../../../core/services/post-job/PostJobCompanyService';
import {SkillService} from '../../../core/services/skill/SkillService';
import {combineLatest} from 'rxjs';

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

    combineLatest([
      this.categoryService.getAll(),
      this.skillService.getAll()
    ]).subscribe( response => {

      this.categories = response[0] as Category[];
      this.skills = response[1] as Skill [];

      console.log('list category', response[0]);
      console.log('list skill', response[1]);
    });

    // Initialize Form Group
    this.postJobForm = this.formBuilder.group({
      'title': ['', [Validators.required]],
      'description': ['', [Validators.required]],
      'categoryId': ['', [Validators.required]],
      'skill': [''],
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
      console.log('Failed: form submision', this.postJobForm);
    }else {
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
