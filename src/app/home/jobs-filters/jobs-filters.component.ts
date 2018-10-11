import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categories } from '../../core/models/job';

@Component({
  selector: 'app-jobs-filters',
  templateUrl: './jobs-filters.component.html',
  styleUrls: ['./jobs-filters.component.scss']
})
export class JobsFiltersComponent implements OnInit {

  searchJobForm: FormGroup;

  public configDropDown = {
    displayKey: 'name',
    placeholder: 'Select'
  };

  public jobCategories: Array<Categories>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.route.data.subscribe(({ jobCategories }) => {
      this.jobCategories = jobCategories;
    });
    this.initSearcForm();
  }

  initSearcForm() {
    this.searchJobForm = this.formBuilder.group({
      'category': [''],
      'search': [''],
      'location': ['']
    });
  }


  onSubmitSearch(): void {
    const { category, location, search } = this.searchJobForm.value
    const params = {
      category: category.id,
      location,
      search
    }
    if (category || location || search) {
      this.router.navigate(['/browse-jobs'], { queryParams: params, queryParamsHandling: 'merge' });
    }
  }
}
