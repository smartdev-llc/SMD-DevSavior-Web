import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { SharedModule } from '../shared/shared.module';
// Components
import { JobsComponent } from './components/list-jobs/jobs.component';
import  { JobDetailComponent } from './components/job-detail/job-detail.component';
// Breadcrumb components
// Routes
import { JobsRoutes as routes } from './jobs.routes';

@NgModule({
  declarations: [
    JobsComponent,
    JobDetailComponent
  ],
  exports: [
  ],
  imports: [
    RouterModule.forChild(routes),
    NgxInputStarRatingModule,
    SharedModule
  ]
})
export class JobsModule { }
