import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateCacheService } from 'ngx-translate-cache';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageService {

  private DEFAULT_LANG = 'en';

  constructor(
    private translateService: TranslateService,
    private translateCacheService: TranslateCacheService
  ) {
    translateCacheService.init();
  }

  setDefaultLang() {
    const lang = this.translateCacheService.getCachedLanguage() || this.DEFAULT_LANG;
    this.translateService.use(lang);
  }

  getCachedLanguage() {
    return this.translateCacheService.getCachedLanguage() || this.DEFAULT_LANG;
  }

  changeLanguage(language: string): Observable<any> {
    return this.translateService.use(language)
  }
}
