import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { LayoutModule } from '../layout';
import { SharedModule } from '../shared/shared.module';

// Components
import { BrowseJobsComponent } from './components/list-browse-jobs/browse-jobs.component';
import { BrowseJobsAlternativeComponent } from './components/list-browse-jobs-alternative/browse-jobs-alternative.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap/pagination';

// Breadcrumb components
// Routes
import { JobsRoutes as routes } from './jobs.routes';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CategoryCompanyService } from '../core/services/category/CategoryCompanyService';
import { SkillService } from '../core/services/skill/SkillService';

import { JobCategories }  from './components/list-browse-jobs/job-resolve';

import { ParseSkill } from '../core/pipes/parse-skill.pipe';
import {JobService} from '../core/services/job.service';


@NgModule({
  declarations: [
    BrowseJobsComponent,
    BrowseJobsAlternativeComponent,
    JobDetailComponent,
    ContactUsComponent,
    ParseSkill
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
    NgxInputStarRatingModule,
    LayoutModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [
    CategoryCompanyService,
    SkillService,
    JobCategories,
    JobService
  ]
})
export class JobsModule { }
