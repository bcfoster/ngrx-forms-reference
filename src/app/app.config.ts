import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
  makeEnvironmentProviders,
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { API_BASE_URL } from './services/wrio-api.service';
import { form } from './state/form';
import { drafts } from './state/drafts';
import { DraftsEffects } from './state/drafts/drafts.effects';
import { FormEffects } from './state/form/form.effects';

const provideApiBaseUrl = () =>
  makeEnvironmentProviders([
    {
      provide: API_BASE_URL,
      useValue: 'https://localhost:7231',
    },
  ]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideApiBaseUrl(),
    provideEffects([FormEffects, DraftsEffects]),
    provideHttpClient(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
    ),
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState(drafts.feature),
    provideState(form.feature),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
