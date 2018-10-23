import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from '../layout';
import { SharedModule } from '../shared/shared.module';
// Components
import { HomeComponent } from './home.component';
import { JobsFiltersComponent } from './jobs-filters/jobs-filters.component';
// Breadcrumb components
// Routes
import { HomeRoutes as routes } from './home.routes';

import { JobCategories }  from './jobs-filters/job-resolve';

@NgModule({
  declarations: [
    HomeComponent,
    JobsFiltersComponent,
  ],
  exports: [
    JobsFiltersComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxInputStarRatingModule,
    LayoutModule,
    SharedModule
  ],
  providers: [
    JobCategories
  ]
})
export class HomeModule { }
