import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap';
import { LayoutModule } from '../layout';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DetailCompanyComponent } from './components/company-detail/company-detail.component';

import { ListCompanyComponent } from './components/companies/companies.component';
import { CompaniesRoutes as routes } from './companies.routes';
import { CompanyDetailResolve } from './components/company-detail/company-detail.resolve';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    RouterModule.forChild(routes),
    LayoutModule,
    SharedModule
  ],
  exports:[],
  declarations: [
    ListCompanyComponent,
    DetailCompanyComponent
  ],
  providers: [
    CompanyDetailResolve
  ]
})
export class CompaniesModule { }
