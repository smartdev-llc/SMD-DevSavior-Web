import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgProgressModule } from '@ngx-progressbar/core';
import { HttpClientModule } from '@angular/common/http';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
// Components

// Services
import { AuthService } from './services/auth.service';
import { AuthActions } from '../auth/actions/auth.actions';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HumanizePipe } from './pipes/humanize.pipe';

import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from '../auth/effects/auth.effects';
import { StudentUserAuthGuard } from './guards/student-user.guard';

@NgModule({
  declarations: [
    HumanizePipe
  ],
  exports: [
    // components
    // DummyService
    NgProgressModule
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
    AuthService,
    AuthActions,
    StudentUserAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
})
export class CoreModule { }
