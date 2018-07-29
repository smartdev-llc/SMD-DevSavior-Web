import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout/index';
import { SharedModule } from '../shared/shared.module';

import { StLoginComponent } from './components/st-login/st-login.component';
import { StRegisterComponent } from './components/st-register/st-register.component';

import { AuthRoutes as routes } from './auth.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    SharedModule
  ],
  declarations: [
    StLoginComponent,
    StRegisterComponent
  ]
})
export class AuthModule { }
