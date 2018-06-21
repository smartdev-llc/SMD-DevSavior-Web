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
// import { ProductDummyService } from './services/product-dummy.service';

import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from '../auth/effects/auth.effects';
import { CanActivateViaAuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    // components
    // DummyService,
    // pipes
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
    CanActivateViaAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ]
})
export class CoreModule { }
