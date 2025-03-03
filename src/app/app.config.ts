import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })
    ),
    provideAnimations(),
    provideHttpClient(),
  ],
};

// export const URL_API = 'http://localhost:1337/api/';
// export const URL_IMAGE = 'http://localhost:1337';

export const URL_API = 'https://better-triumph-4bca3db5e2.strapiapp.com/api/';
export const URL_IMAGE = '';
