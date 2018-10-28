import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isEnLang: boolean = false;
 
  constructor(private languageService: LanguageService
    ) {
      const lang = languageService.getCachedLanguage()
      languageService.setDefaultLang()
      if (lang === 'en') {
        this.isEnLang = true
      }
    }

    changeLanguage(language: string): void {
      this.languageService.changeLanguage(language).subscribe(() => {
        language === 'en' ? this.isEnLang = true : this.isEnLang = false;
      });
    }
  
  ngOnInit() {
  }

}