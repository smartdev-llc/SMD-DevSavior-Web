import { environment } from '../../../environments/environment';

import {Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})

export class HomeHeaderComponent implements OnInit, OnDestroy {
  isEnLang: boolean = false;
  user: any;
  subscription: Subscription;
  employerUrl = environment.employerUrl;

  constructor(
    private authService: AuthService,
    private router: Router,
    private languageService: LanguageService
  ) {
    const lang = languageService.getCachedLanguage()
    languageService.setDefaultLang()
    if (lang === 'en') {
      this.isEnLang = true
    }

  }

  ngOnInit() {
    let currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.subscription = this.authService.getLoggedInUser.subscribe((user: Object) => {
        if (user) {
          this.user = user;
        }
      })
    } else {
      this.user = currentUser;
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  changeLanguage(language: string): void {
    this.languageService.changeLanguage(language).subscribe(() => {
      language === 'en' ? this.isEnLang = true : this.isEnLang = false;
    });
  }

  logout() {
    this.authService.logout()
      .subscribe(_ => {
        this.authService.signOut();
        localStorage.removeItem('user');
        this.router.navigate(['/login'])
      })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
