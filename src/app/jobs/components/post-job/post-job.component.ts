import { Component, OnInit } from '@angular/core';
import {CategoryCompanyService} from '../../../core/services/category/CategoryCompanyService';

@Component({
  selector: 'post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {
  categories: Category[];

  constructor(private categoryService: CategoryCompanyService) {
  }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      (listCategory: Category[]) => {
        this.categories = listCategory;
        console.log('data', this.categories);
      }
    );
  }
}

interface Category {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
}
