import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '../layout';
import { SharedModule } from '../shared/shared.module';

import { StLoginComponent } from './components/st-login/st-login.component';
import { StRegisterComponent } from './components/st-register/st-register.component';
import { RegisterSuccessComponent } from './components/registerSuccess/registerSuccess.component';

import { AuthRoutes as routes } from './auth.routes';
import { FormsModule, 
         ReactiveFormsModule }   from '@angular/forms';

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
    RegisterSuccessComponent
  ]
})
export class AuthModule { }
