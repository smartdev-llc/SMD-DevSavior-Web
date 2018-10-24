import { RouterModule, Routes } from '@angular/router';

// components
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
// Guards
import { StudentUserAuthGuard } from './core/guards/student-user.guard';
import { StudentLoggedGuard } from './core/guards/student-logged.guard';

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
    loadChildren: './company/company.module#CompanyModule',
    canActivate: [StudentLoggedGuard]
  },
  {
    path: '',
    loadChildren: './user/user.module#UserModule',
    canActivate: [StudentUserAuthGuard]
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
