import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NotificationJobs } from './components/notification-jobs/notification-jobs.component';
import { UserRoutes as routes } from './user.routes';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StepsUpdateProfile } from './components/steps-update-profile/steps-update-profile.component';
import { UpdateProfileStep1Component } from './components/update-profile/step1/step1.component';
import { UpdateProfileStep2Component } from './components/update-profile/step2/step2.component';
import { UpdateProfileStep3Component } from './components/update-profile/step3/step3.component';
import { UpdateProfileStep4Component } from './components/update-profile/step4/step4.component';
import { UpdateProfileStep5Component } from './components/update-profile/step5/step5.component';

import { StudentUserService }  from './services/student-user.serivce';
import { EducationDegrees } from '../core/pipes/education-degrees.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FileUploadModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    SharedModule
  ],
  exports:[
  ],
  declarations: [
    DashboardComponent,
    StepsUpdateProfile,
    UpdateProfileStep1Component,
    UpdateProfileStep2Component,
    UpdateProfileStep3Component,
    UpdateProfileStep4Component,
    UpdateProfileStep5Component,
    EducationDegrees,
    NotificationJobs
  ],
  providers: [
    StudentUserService
  ]
})
export class UserModule { }
