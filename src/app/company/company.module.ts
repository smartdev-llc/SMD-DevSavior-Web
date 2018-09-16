import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { companyRoutes } from './company.routes';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(companyRoutes)
  ],
  declarations: [
    HomeComponent,
    LoginComponent
  ]
})
export class CompanyModule { }
