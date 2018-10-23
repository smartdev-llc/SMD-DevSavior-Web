import { Subscription, Observable } from 'rxjs';
import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User, Role } from '../models/user';

// If user logged we block they back login, register,.. pages

@Injectable()
export class StudentLoggedGuard implements CanActivate {
  user: User;
  isStudentRole: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.user = this.authService.getCurrentUser();
    this.isStudentRole = !!this.user && this.user.role === Role.Student;

    if (this.isStudentRole) {
      this.router.navigate(['/']);
    }

    return !this.isStudentRole;
  }
}
