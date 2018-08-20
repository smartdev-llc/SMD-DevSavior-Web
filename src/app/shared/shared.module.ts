import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// components
import { JobListComponent } from './components/jobs/jobs-list/job-list.component';
import { JobItemComponent } from './components/jobs/job-item/job-item.component';
import { LoadmoreButtonComponent } from './components/loadmore-button/loadmore-button.component';
import { CompanyItemComponent } from './components/company/company-item.component';

@NgModule({
  declarations: [
    JobItemComponent,
    JobListComponent,
    LoadmoreButtonComponent,
    CompanyItemComponent
  ],
  exports: [
    CommonModule,
    JobItemComponent,
    JobListComponent,
    LoadmoreButtonComponent,
    CompanyItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxInputStarRatingModule
  ]
})
export class SharedModule { }
