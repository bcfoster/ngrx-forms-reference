/* eslint-disable @typescript-eslint/no-unused-vars */

import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { map, Observable } from 'rxjs';

import { PersonalAndContactInfoFormCardComponent } from './form-cards/personal-and-contact-info-form-card/personal-and-contact-info-form-card.component';
import { formActions } from '../state/form/form.actions';
import * as formReducer from '../state/form/form.reducer';
import * as formSelectors from '../state/form/form.selectors';
import { IncidentAndInjuryDetailsFormCardComponent } from './form-cards/incident-and-injury-details-form-card/incident-and-injury-details-form-card.component';
import { TreatmentDetailsFormCardComponent } from './form-cards/treatment-details-form-card/treatment-details-form-card.component';

@Component({
  selector: 'form-root',
  imports: [
    IncidentAndInjuryDetailsFormCardComponent,
    JsonPipe,
    PersonalAndContactInfoFormCardComponent,
    PushPipe,
    RouterLink,
    TreatmentDetailsFormCardComponent,
  ],
  templateUrl: 'form-root.component.html',
})
export class FormRootComponent {
  form$: Observable<FormGroupState<formReducer.Form>>;
  formState$: Observable<Partial<FormGroupState<formReducer.Form>>>;
  state$: Observable<formReducer.State>;

  constructor(
    private readonly store: Store,
    protected readonly router: Router,
  ) {
    this.form$ = this.store.select(formSelectors.selectForm);
    this.formState$ = this.form$.pipe(map(({ value, ...rest }) => rest));
    this.state$ = this.store.select(formSelectors.selectFormState);
  }

  exit() {
    this.store.dispatch(formActions.exit());
  }

  reset() {
    this.store.dispatch(formActions.reset());
  }

  save() {
    this.store.dispatch(formActions.save());
  }
}
