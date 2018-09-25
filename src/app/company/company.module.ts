import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyRoutes } from './company.routes';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component';
import { FindResumesComponent } from './components/find-resumes/find-resumes.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { LayoutModule } from '../layout/index';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CompanyRoutes),
    LayoutModule,
    NgSelectModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    FindResumesComponent,
    JobListComponent,
    CandidateListComponent
  ],
  bootstrap: [ HomeComponent ]
})
export class CompanyModule { }
