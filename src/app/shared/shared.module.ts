import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// components
import { JobItemComponent } from './components/job-item/job-item.component';

@NgModule({
  declarations: [
    JobItemComponent
  ],
  exports: [
    CommonModule,
    JobItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxInputStarRatingModule
  ]
})
export class SharedModule { }
