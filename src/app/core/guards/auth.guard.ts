import { Subscription, Observable } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  isAuthenticated: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.isAuthenticated = this.authService.isLoggedIn();
    if (!this.isAuthenticated) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    }
    return this.isAuthenticated;
  }
}
