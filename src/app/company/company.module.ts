import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompanyRoutes } from './company.routes';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component';
import { FindResumesComponent } from './components/find-resumes/find-resumes.component';
import { LayoutModule } from '../layout/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CompanyRoutes),
    LayoutModule
  ],
  declarations: [
    HomeComponent,
    LoginComponent,
    FindResumesComponent
  ]
})
export class CompanyModule { }
