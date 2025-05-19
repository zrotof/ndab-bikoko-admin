import { ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';

import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';

//import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withEnabledBlockingInitialNavigation(), withComponentInputBinding(), withInMemoryScrolling(
      {
        scrollPositionRestoration: "enabled"
      }
    )),
    provideHttpClient(
      //withInterceptors([authInterceptor])
    ),
    //    { provide: HTTP_INTERCEPTORS,  useClass: ReqInterceptor , multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'fr' },

    importProvidersFrom(FontAwesomeModule),
    provideAnimations(),
    provideClientHydration(),
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
          theme: 'lara-light-blue',
          darkModeSelector: false
        }
      },
    }),
  ]
};    
