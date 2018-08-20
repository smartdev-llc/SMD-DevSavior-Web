import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/index';
import { SharedModule } from '../shared/shared.module';

import { StLoginComponent } from './components/st-login/st-login.component';
import { StRegisterComponent } from './components/st-register/st-register.component';
import { StLostPasswordComponent } from './components/st-lost-password/st-lost-password.component';

import { AuthRoutes as routes } from './auth.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    StLoginComponent,
    StRegisterComponent,
    StLostPasswordComponent
  ]
})
export class AuthModule { }
