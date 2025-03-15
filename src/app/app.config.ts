import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { form } from './state/form';
import { drafts } from './state/drafts';
import { DraftsEffects } from './state/drafts/drafts.effects';
import { FormEffects } from './state/form/form.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects([FormEffects, DraftsEffects]),
    provideRouter(routes),
    provideStore(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideState(drafts.feature),
    provideState(form.feature),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
