import { RouterModule, Routes } from '@angular/router';
import { CanActivateViaAuthGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  {
    path: '',
    loadChildren: './home/index#HomeModule' },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  }
];
