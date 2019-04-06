import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Categories } from '../../core/models/job';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-jobs-filters',
  templateUrl: './jobs-filters.component.html',
  styleUrls: ['./jobs-filters.component.scss']
})
export class JobsFiltersComponent implements OnInit {

  searchJobForm: FormGroup;

  configDropDown = {
    displayKey: 'name',
    bindValue: 'id',
    placeholder: 'Select'
  };

  public jobCategories: Array<Categories>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.route.data.subscribe(({ jobCategories }) => {
      jobCategories.unshift({
        id: '',
        name: this.translate.instant('jobFilter.allCategories')
      });
      this.jobCategories = jobCategories;
    });
    this.initSearcForm();
  }

  initSearcForm() {
    this.searchJobForm = this.formBuilder.group({
      'category': [''],
      'qs': [''],
      'location': ['']
    });
  }


  onSubmitSearch(): void {
    const { category, location, qs } = this.searchJobForm.value
    const params = {
      category: category,
      location,
      qs
    }
    this.router.navigate(['/browse-jobs'], { queryParams: params, queryParamsHandling: 'merge' });
  }
}
