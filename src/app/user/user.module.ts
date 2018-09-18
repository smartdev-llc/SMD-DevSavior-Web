import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/index';
import { SharedModule } from '../shared/shared.module';

import { UserRoutes as routes } from './user.routes';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    SharedModule
  ],
  exports:[
  ],
  declarations: [
    DashboardComponent
  ]
})
export class UserModule { }
