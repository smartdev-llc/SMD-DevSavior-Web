import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { StLoginComponent } from './components/st-login/st-login.component';
import { StRegisterComponent } from './components/st-register/st-register.component';
import { RegisterSuccessComponent } from './components/registerSuccess/registerSuccess.component';
import { StLostPasswordComponent } from './components/st-lost-password/st-lost-password.component';
import { MatchingPasswordDirective } from './validators/matching-password.directive';

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
    RegisterSuccessComponent,
    StLostPasswordComponent,
    MatchingPasswordDirective
  ]
})
export class AuthModule { }
