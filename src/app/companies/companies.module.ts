
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/index';
import { SharedModule } from '../shared/shared.module';

import { ListCompanyComponent } from './components/list-company/list-company.component';
import { CompaniesRoutes as routes } from './companies.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    SharedModule
  ],
  exports:[
    ListCompanyComponent
  ],
  declarations: [
    ListCompanyComponent
  ]
})
export class CompaniesModule { }
