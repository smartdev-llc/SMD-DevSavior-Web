import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateCacheService } from 'ngx-translate-cache';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  isEnLang: boolean = false
  
  constructor(
    private translateService: TranslateService,
    private translateCacheService: TranslateCacheService
  ) {
    translateService.setDefaultLang('en');
    translateCacheService.init();
    const lang = translateCacheService.getCachedLanguage() || translateService.getBrowserLang()
    if (lang === 'en') {
      this.isEnLang = true
    }
  }

  ngOnInit() {
  }

  changeLanguage(language: string): void {
    this.translateService.use(language).subscribe(() => {
      language === 'en' ? this.isEnLang = true : this.isEnLang = false;
    });
  }
}
