import { PercentPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { map, Observable } from 'rxjs';

import { formActions } from '../state/form/form.actions';
import * as formReducer from '../state/form/form.reducer';
import * as formSelectors from '../state/form/form.selectors';

@Component({
  selector: 'form-root',
  imports: [PercentPipe, PushPipe, RouterLink],
  templateUrl: 'form-root.component.html',
})
export class FormRootComponent {
  contactPercentComplete$: Observable<number>;
  form$: Observable<FormGroupState<formReducer.Form>>;
  inProgress$: Observable<boolean>;

  constructor(
    private readonly store: Store,
    protected readonly router: Router,
  ) {
    this.contactPercentComplete$ = this.store.select(
      formSelectors.selectContactFormPercentComplete,
    );
    this.inProgress$ = this.contactPercentComplete$.pipe(map((percent) => percent > 0));
    this.form$ = this.store.select(formSelectors.selectForm);
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
