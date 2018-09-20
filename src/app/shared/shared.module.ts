import { environment } from '../../environments/environment';
import { NgxInputStarRatingModule } from '@ngx-lite/input-star-rating';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// components
import { JobListComponent } from './components/jobs/jobs-list/job-list.component';
import { JobItemComponent } from './components/jobs/job-item/job-item.component';
import { LoadmoreButtonComponent } from './components/loadmore-button/loadmore-button.component';
import { CompanyItemComponent } from './components/company/company-item.component';
import { HotJobItemComponent } from './components/jobs/hotjob-item/hotjob-item.component';

// import ngx-translate and the http loader
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateCacheModule, TranslateCacheSettings, TranslateCacheService } from 'ngx-translate-cache';
import { SocialLoginModule, AuthServiceConfig } from "angular-6-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular-6-social-login";

@NgModule({
  declarations: [
    JobItemComponent,
    JobListComponent,
    HotJobItemComponent,
    LoadmoreButtonComponent,
    CompanyItemComponent,

  ],
  exports: [
    CommonModule,
    JobItemComponent,
    JobListComponent,
    HotJobItemComponent,
    LoadmoreButtonComponent,
    CompanyItemComponent,
    TranslateModule,
    TranslateCacheModule,
    SocialLoginModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxInputStarRatingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TranslateCacheModule.forRoot({
      cacheService: {
        provide: TranslateCacheService,
        useFactory: (translateService, translateCacheSettings) => {
            return new TranslateCacheService(translateService, translateCacheSettings)
        },
        deps: [ TranslateService, TranslateCacheSettings ]
      }
    }),
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class SharedModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.appUrl}/assets/i18n/`, '.json');
}

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("116950717907-t331s4qcs1lqslkrcs2u05jimoac22h9.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("857769421089853")
  }
]);

export function provideConfig() {
  return config;
}
