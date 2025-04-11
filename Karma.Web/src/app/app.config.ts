import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideRouterStore, StoreRouterConnectingModule } from '@ngrx/router-store';
import { provideStoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaEffects } from './store/MetaEffects';
import { reducers, metaReducers } from './store/MetaReducers';
import { environment } from 'src/environments/environment';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalInterceptor, MsalService } from '@azure/msal-angular';
import * as msalConfigs from './msal.config';
import { httpInterceptorServiceInterceptor } from './interceptor/http-interceptor-service.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    

    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withDebugTracing(),
    ),
    
    importProvidersFrom(
      
      StoreModule.forRoot( reducers , { metaReducers } ),
      EffectsModule.forRoot( metaEffects ),
      StoreRouterConnectingModule.forRoot(),
      StoreDevtoolsModule.instrument({ maxAge: 100, logOnly: environment.production })
    ),

    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: msalConfigs.karmaMSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: msalConfigs.karmaMSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: msalConfigs.MSALInterceptorConfigFactory
    },

    MsalService,
    MsalGuard,
    MsalBroadcastService,

    /* {
      provide: HTTP_INTERCEPTORS,
      useClass: httpInterceptorServiceInterceptor,
      multi: true
    }, provideAnimationsAsync() */
  ]
};
