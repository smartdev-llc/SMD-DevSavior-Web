import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateCacheService } from 'ngx-translate-cache';
import { LanguageService } from '../services/language.service';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-company',
  templateUrl: './home-company.component.html',
  styleUrls: ['./home-company.component.scss']
})

export class HomeCompanyComponent implements OnInit {
  isEnLang: boolean = false;
  user: any;
  subscription: Subscription;

  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
    private router: Router,
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
        this.router.navigate(['/employer/home']);
        this.user = null;
      })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
