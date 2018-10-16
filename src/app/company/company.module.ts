import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from '../shared/shared.module';
import { CompanyRoutes } from './company.routes';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component';
import { FindResumesComponent } from './components/find-resumes/find-resumes.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { LayoutModule } from '../layout/index';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DetailCandidateComponent } from './components/detail-candidate/detail-candidate.component';
import { CpRegisterComponent } from './components/cp-register/cp-register.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { CarouselModule } from 'ngx-bootstrap';

import { CategoryCompanyService } from '../core/services/category/CategoryCompanyService';
import { PostJobCompanyService } from '../core/services/post-job/PostJobCompanyService';
import { SkillService } from '../core/services/skill/SkillService';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CompanyRoutes),
    CarouselModule.forRoot(),
    QuillModule,
    LayoutModule,
    NgSelectModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    FindResumesComponent,
    JobListComponent,
    CandidateListComponent,
    DetailCandidateComponent,
    CpRegisterComponent,
    StatisticComponent,
    PostJobComponent
  ],
  providers: [
    CategoryCompanyService,
    PostJobCompanyService,
    SkillService
  ]
})
export class CompanyModule { }
