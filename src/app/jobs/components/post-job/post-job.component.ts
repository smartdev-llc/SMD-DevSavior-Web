import { Component, OnInit } from '@angular/core';
import {CategoryCompanyService} from '../../../core/services/category/CategoryCompanyService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {
  categories: Category[];
  postJobForm: FormGroup;
  submitted: boolean;

  constructor(private categoryService: CategoryCompanyService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    // Get List Category
    this.categoryService.getAll().subscribe(
      (listCategory: Category[]) => {
        this.categories = listCategory;
        console.log('data', this.categories);
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
