import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// Components
import { HeaderComponent } from './header/header.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeCompanyComponent } from './home-company/home-company.component';
import { FooterComponent } from './footer/footer.component';
import { HomeCompanyLoggedComponent } from './home-company-logged/home-company-logged.component';
// Modules
import { RouterModule } from '@angular/router';

import { LanguageService } from './services/language.service';

// Modules
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    // components
    HeaderComponent,
    FooterComponent,
    HomeHeaderComponent,
    HomeCompanyComponent,
    HomeCompanyLoggedComponent
    // pipes
  ],
  exports: [
    HeaderComponent,
    HomeHeaderComponent,
    FooterComponent,
    HomeCompanyComponent,
    HomeCompanyLoggedComponent
  ],
  imports: [
  RouterModule,
    SharedModule
  ],
  providers: [
    LanguageService
  ]
})
export class LayoutModule { }
