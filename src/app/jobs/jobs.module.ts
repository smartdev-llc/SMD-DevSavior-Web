import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { ShareButtonModule } from '@ngx-share/button'

import { LayoutModule } from '../layout';
import { SharedModule } from '../shared/shared.module';

// Components
import { BrowseJobsComponent } from './components/list-browse-jobs/browse-jobs.component';
import { BrowseJobsAlternativeComponent } from './components/list-browse-jobs-alternative/browse-jobs-alternative.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { NotificationJobs } from './components/notification-jobs/notification-jobs.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap/pagination';

// Breadcrumb components
// Routes
import { JobsRoutes as routes } from './jobs.routes';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CategoryCompanyService } from '../core/services/category/CategoryCompanyService';
import { SkillService } from '../core/services/skill/SkillService';

import { JobCategories }  from './components/list-browse-jobs/job-resolve';
import {JobService} from '../core/services/job.service';
import {ProfileService} from '../company/services/profile.service';

@NgModule({
  declarations: [
    BrowseJobsComponent,
    BrowseJobsAlternativeComponent,
    JobDetailComponent,
    ContactUsComponent,
    NotificationJobs
  ],
  exports: [
    BrowseJobsComponent,
    BrowseJobsAlternativeComponent,
    JobDetailComponent,
    NotificationJobs
  ],
  imports: [
    RouterModule.forChild(routes),
    PaginationModule.forRoot(),
    ScrollToModule.forRoot(),
    NgxInputStarRatingModule,
    LayoutModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ShareButtonModule.forRoot()
  ],
  providers: [
    CategoryCompanyService,
    SkillService,
    JobCategories,
    JobService,
    ProfileService
  ]
})
export class JobsModule {
  constructor() {
  }
}
