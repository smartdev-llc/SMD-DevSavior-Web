import { RouterModule, Routes } from '@angular/router';
import { StudentUserAuthGuard } from './core/guards/student-user.guard';

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
    loadChildren: './user/user.module#UserModule',
    canActivate: [StudentUserAuthGuard]
  }
];
