import { inject } from '@angular/core';
import { CanActivateFn, Router, Routes } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { FormRootComponent } from './form-root/form-root.component';
import { PersonalAndContactInfoFormComponent } from './form-root/forms/personal-and-contact-info-form/personal-and-contact-info-form.component';
import { WhoAreYouFormComponent } from './form-root/who-are-you-form/who-are-you-form.component';
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
        path: 'who-are-you',
        component: WhoAreYouFormComponent,
      },
      {
        path: 'personal-and-contact-info',
        component: PersonalAndContactInfoFormComponent,
      },
      {
        path: 'incident-and-injury',
        component: PersonalAndContactInfoFormComponent,
      },
      {
        path: 'treatment-details',
        component: PersonalAndContactInfoFormComponent,
      },
      {
        path: 'employment-and-employer-info',
        component: PersonalAndContactInfoFormComponent,
      },
      {
        path: 'summary',
        component: FormSummaryComponent,
      },
    ],
  },
];
