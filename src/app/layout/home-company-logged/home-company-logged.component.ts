import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslateCacheService } from 'ngx-translate-cache';
import { AuthService } from '../../core/services/auth.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-home-company-logged',
  templateUrl: './home-company-logged.component.html',
  styleUrls: ['./home-company-logged.component.scss']
})

export class HomeCompanyLoggedComponent implements OnInit {
  isEnLang: boolean = false

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
        this.router.navigate(['/employer/login'])
      })
  }

}
