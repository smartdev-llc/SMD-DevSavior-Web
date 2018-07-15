import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchActions } from './reducers/search.actions';
import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { LayoutModule } from '../layout/index';
// Components
import { HomeComponent } from './home.component';
// Breadcrumb components
// Routes
import { HomeRoutes as routes } from './home.routes';

import { reducers } from './reducers/index';
@NgModule({
  declarations: [
    // components
    HomeComponent
  ],
  exports: [
  ],
  imports: [
    RouterModule.forChild(routes),
    NgxInputStarRatingModule,
    LayoutModule,
    StoreModule.forFeature('home', reducers)
  ],
  providers: [
    SearchActions
  ]
})
export class HomeModule { }
