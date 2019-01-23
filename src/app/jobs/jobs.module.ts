import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { ShareButtonModule } from '@ngx-share/button'
import { ModalModule } from 'ngx-bootstrap/modal';
import { LayoutModule } from '../layout';
import { SharedModule } from '../shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { PostJobCompanyService } from '../core/services/post-job/PostJobCompanyService';


// Components
import { BrowseJobsComponent } from './components/list-browse-jobs/browse-jobs.component';
import { BrowseJobsAlternativeComponent } from './components/list-browse-jobs-alternative/browse-jobs-alternative.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { EditJobComponent }  from './components/edit-job/edit-job.component';


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
    EditJobComponent,
    ContactUsComponent
  ],
  exports: [
    BrowseJobsComponent,
    BrowseJobsAlternativeComponent,
    JobDetailComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    PaginationModule.forRoot(),
    ScrollToModule.forRoot(),
    ModalModule.forRoot(),
    NgxInputStarRatingModule,
    LayoutModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    QuillModule,
    ShareButtonModule.forRoot()
  ],
  providers: [
    CategoryCompanyService,
    SkillService,
    JobCategories,
    PostJobCompanyService,
    JobService,
    ProfileService
  ]
})
export class JobsModule {
  constructor() {
  }
}
