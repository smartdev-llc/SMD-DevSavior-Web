import { Injectable, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categories } from '../../../core/models/job';
import { from } from 'rxjs';
import { find } from 'rxjs/operators';

@Component({
  selector: 'browse-jobs',
  templateUrl: './browse-jobs.component.html',
  styleUrls: ['./browse-jobs.component.scss']
})
export class BrowseJobsComponent implements OnInit {

  searchJobForm: FormGroup;
  configDropDown = {
    displayKey: 'name',
    placeholder: 'Select'
  };

  jobCategories: Array<Categories>;

  queryParams: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.route.data.subscribe(({ jobCategories }) => {
      this.jobCategories = jobCategories;
    });

    this.route.queryParams.subscribe(params => {
       this.queryParams = params;
    });

    this.initSearcForm();
  }

  initSearcForm() {
    const { category, search, location } = this.queryParams;
    let objCategory = null;
    from(this.jobCategories)
      .pipe(
        find((item) => item.id == category)
      )
      .subscribe(value => objCategory = value)

    this.searchJobForm = this.formBuilder.group({
      'category': [objCategory],
      'search': [search],
      'location': [location]
    });
  }

  selectionChanged($event:any) {
    // console.log($event);
  }

  onSubmitSearch(): void {
    const { category, location, search } = this.searchJobForm.value
    const params = {
      category: category ? category.id : '',
      location,
      search
    }
    if (category || location || search) {
      this.router.navigate(['/browse-jobs'], { queryParams: params, queryParamsHandling: 'merge' });
    }
  }
}
