import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAuthGuard } from './core/guards/auth.guard';
import { PolicyComponent } from './policy/policy.component';


export const routes: Routes = [
  {
    path: '',
    loadChildren: './home/index#HomeModule'
  },
  {
    path: '',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '',
    loadChildren: './jobs/jobs.module#JobsModule'
  },
  {
    path: '',
    loadChildren: './companies/companies.module#CompaniesModule'
  },
  {
    path: '',
    loadChildren: './company/company.module#CompanyModule'
  },
  {
    path: '',
    loadChildren: './user/user.module#UserModule'
  },
  {
    path:'privacy-policy',
    component:PolicyComponent
  }
];
