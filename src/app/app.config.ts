import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withInMemoryScrolling} from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(
          routes,
          withInMemoryScrolling({
            scrollPositionRestoration: 'top'
          })
      ),
      provideAnimations(),
      provideHttpClient()
    ]
};

export const URL_API = 'https://strapi-project-32d4.onrender.com/api/';
export const URL_IMAGE = 'https://strapi-project-32d4.onrender.com';
