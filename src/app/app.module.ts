// Core angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Services 
import { ServiceModule } from './services/index';
import { routes } from './app.routes';
import { reducer } from './reducers/index';

//Directives
import { Autosize } from 'angular2-autosize/angular2-autosize';
import { TripHasPlaces } from './Validators/trip-has-places.directive';

// Components
import { AppComponent } from './app.component';
import { AmbassadorComponent } from './components/misc/ambassador/ambassador.component';
// Satellizer Module
import { Ng2UiAuthModule, CustomConfig } from 'ng2-ui-auth';
import { MyAuthConfig } from './auth-config';

import { AppEffectsModule } from './effects/index';
import { ComponentsModule } from './components/index';
import { SharedModule } from './shared/index';
import { CanActivateViaAuthGuard } from './guards/auth.guard';
import { TripsResolveGuard } from './guards/trips-resolve.guard';
import { InstagramAuthenticationCallbackComponent } from './shared/instagram-authentication-callback/instagram-authentication-callback.component';

/**Action Cable */
import { Ng2Cable, Broadcaster } from 'ng2-cable/js/index';
/**RestAngular */
import { RestangularModule } from 'ng2-restangular';
import  { RestangularConfigFactory }  from './rest-angular-config'

@NgModule({
  declarations: [
    AppComponent,
    Autosize,
    TripHasPlaces,
    AmbassadorComponent,
    InstagramAuthenticationCallbackComponent
  ],
  imports: [
    BrowserModule,
    Ng2UiAuthModule.forRoot(MyAuthConfig),
    StoreModule.provideStore(reducer),
    RouterModule.forRoot(routes),
    // Importing RestangularModule and making default configs for restanglar
    RestangularModule.forRoot(RestangularConfigFactory),
    ComponentsModule,
    SharedModule,
    ServiceModule,
    AppEffectsModule,
    // Importing RestangularModule and making default configs for restanglar
    RestangularModule.forRoot(RestangularConfigFactory),
  ],
  providers: [
    CanActivateViaAuthGuard,
    TripsResolveGuard,
    Ng2Cable,
    Broadcaster
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
