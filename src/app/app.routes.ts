import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { ContactFormComponent } from './forms/contact-form/contact-form.component';
import { FormRootComponent } from './form-root/form-root.component';
import { FormShellComponent } from './form-shell/form-shell.component';
import { FormSummaryComponent } from './form-summary/form-summary.component';
import * as draftSelectors from './state/drafts/drafts.selectors';

export const isFormActive: CanActivateFn = () => {
  const router = inject(Router);
  return inject(Store)
    .select(draftSelectors.selectActiveDraftId)
    .pipe(map((id) => (id ? true : router.createUrlTree(['/']))));
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: FormShellComponent },
  {
    path: 'form',
    canActivateChild: [isFormActive],
    children: [
      {
        path: '',
        component: FormRootComponent,
      },
      {
        path: 'contact',
        component: ContactFormComponent,
      },
      {
        path: 'summary',
        component: FormSummaryComponent,
      },
    ],
  },
];
