import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { LayoutModule } from '../layout/index';
// Components
import { HomeComponent } from './home.component';
import  { JobsFiltersComponent } from './jobs-filters/jobs-filters.component'
// Breadcrumb components
// Routes
import { HomeRoutes as routes } from './home.routes';

@NgModule({
  declarations: [
    HomeComponent,
    JobsFiltersComponent
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
