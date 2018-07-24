import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { LayoutModule } from '../layout';
// Components
import { HomeComponent } from './home.component';
import  { JobsFiltersComponent } from'./jobs-filters/jobs-filters.component'
import { JobListComponent } from './jobs/jobs-list/job-list.component';
import { JobContentComponent } from './jobs/summary-job/job-content.component';
// Breadcrumb components
// Routes
import { HomeRoutes as routes } from './home.routes';

@NgModule({
  declarations: [
    HomeComponent,
    JobsFiltersComponent,
    JobListComponent,
    JobContentComponent    
  ],
  exports: [
  ],
  imports: [
    RouterModule.forChild(routes),
    NgxInputStarRatingModule,
    LayoutModule
  ]
})
export class HomeModule { }
