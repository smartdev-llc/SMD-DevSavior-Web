import { Subscription, Observable } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User, Role } from '../models/user';

@Injectable()
export class CompanyUserAuthGuard implements CanActivate {
  user: User;
  isCompanyRole: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.user = this.authService.getCurrentUser();
    this.isCompanyRole = !!this.user && this.user.role === Role.Company;

    if (!this.isCompanyRole) {
      this.router.navigate(['/employer/login'], { queryParams: { returnUrl: state.url }});
    }

    return this.isCompanyRole;
  }
}
