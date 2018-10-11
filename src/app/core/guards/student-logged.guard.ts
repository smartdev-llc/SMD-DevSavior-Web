import { Subscription, Observable } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

// If user logged we block they back login, register,.. pages

@Injectable()
export class StudentLoggedGuard implements CanActivate {
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.isLoggedIn = this.authService.isLoggedIn();

    if (this.isLoggedIn) {
      this.router.navigate(['/']);
    }

    return !this.isLoggedIn;
  }
}
