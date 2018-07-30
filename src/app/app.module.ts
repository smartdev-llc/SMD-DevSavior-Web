import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Components
import { AppComponent } from './app.component';
// Routes
import { routes } from './app.routes';
// Modules
import { HomeModule } from './home';
import { LayoutModule } from './layout';
import { CoreModule } from './core';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './app.reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    !environment.production ? StoreDevtoolsModule.instrument() : [],

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HomeModule,
    LayoutModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
