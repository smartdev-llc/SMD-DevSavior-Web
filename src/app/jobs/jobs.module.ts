import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { LayoutModule } from '../layout/index';
import { SharedModule } from '../shared/shared.module';
import { QuillModule } from 'ngx-quill';

// Components
import { BrowseJobsComponent } from './components/list-browse-jobs/browse-jobs.component';
import { BrowseJobsAlternativeComponent } from './components/list-browse-jobs-alternative/browse-jobs-alternative.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap/pagination';

// Breadcrumb components
// Routes
import {JobsRoutes as routes} from './jobs.routes';
import {ContactUsComponent} from './components/contact-us/contact-us.component';
import {CategoryCompanyService} from '../core/services/category/CategoryCompanyService';
import {PostJobCompanyService} from '../core/services/post-job/PostJobCompanyService';
import {SkillService} from '../core/services/skill/SkillService';

import { JobCategories }  from './components/list-browse-jobs/job-resolve';

import { ParseSkill } from '../core/pipes/parse-skill.pipe';


@NgModule({
  declarations: [
    BrowseJobsComponent,
    BrowseJobsAlternativeComponent,
    JobDetailComponent,
    PostJobComponent,
    ContactUsComponent,
    ParseSkill
  ],
  exports: [
    BrowseJobsComponent,
    BrowseJobsAlternativeComponent,
    JobDetailComponent,
    PostJobComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    PaginationModule.forRoot(),
    ScrollToModule.forRoot(),
    NgxInputStarRatingModule,
    QuillModule,
    LayoutModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [
    CategoryCompanyService,
    PostJobCompanyService,
    SkillService,
    JobCategories
  ]
})
export class JobsModule { }
