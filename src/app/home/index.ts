import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SearchActions } from './reducers/search.actions';
import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
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

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('home', reducers)
  ],
  providers: [
    SearchActions
  ]
})
export class HomeModule { }
