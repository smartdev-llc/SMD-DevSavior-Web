import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// Components
import { HeaderComponent } from './header/header.component';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { FooterComponent } from './footer/footer.component';
// Modules
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    // components
    HeaderComponent,
    FooterComponent,
    HomeHeaderComponent
    // pipes
  ],
  exports: [
    HeaderComponent,
    HomeHeaderComponent,
    FooterComponent
  ],
  imports: [
    RouterModule,
    SharedModule
  ]
})
export class LayoutModule { }
