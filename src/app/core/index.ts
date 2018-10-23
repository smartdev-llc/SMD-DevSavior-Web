import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
// Components

// Services
import { AuthService } from './services/auth.service';
import { JobService } from './services/job.service';
import { InfoCompanyService } from './services/company/InfoCompany.service';
import { AuthActions } from '../auth/actions/auth.actions';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HumanizePipe } from './pipes/humanize.pipe';

import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from '../auth/effects/auth.effects';
import { StudentUserAuthGuard } from './guards/student-user.guard';
import { StudentLoggedGuard } from './guards/student-logged.guard';
import { CompanyUserAuthGuard } from './guards/company-user.guard';
import { CompanyLoggedGuard } from './guards/company-logged.guard';
import { PhotoURLConverterPipe } from './pipes/photo-urlconverter.pipe';

@NgModule({
  declarations: [
    HumanizePipe,
    PhotoURLConverterPipe
  ],
  exports: [
    // components
    // DummyService
    NgProgressModule, 
    PhotoURLConverterPipe
  ],
  imports: [
    // Were not working on modules sice update to rc-5
    // TO BE moved to respective modules.
    EffectsModule.forFeature([
      AuthenticationEffects
    ]),
    HttpClientModule,
    NgProgressModule.forRoot({
      meteor: false
    }),
    NgProgressHttpModule,
  ],
  providers: [
    InfoCompanyService,
    AuthService,
    JobService,
    AuthActions,
    StudentUserAuthGuard,
    StudentLoggedGuard,
    CompanyUserAuthGuard,
    CompanyLoggedGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
})
export class CoreModule { }
