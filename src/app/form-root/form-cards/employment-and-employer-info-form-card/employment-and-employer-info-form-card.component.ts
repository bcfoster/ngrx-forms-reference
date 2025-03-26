import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { map, Observable } from 'rxjs';

import * as formReducer from '../../../state/form/form.reducer';
import * as formSelectors from '../../../state/form/form.selectors';

@Component({
  selector: 'employment-and-employer-info-form-card',
  imports: [PushPipe, RouterLink],
  templateUrl: 'employment-and-employer-info-form-card.component.html',
  styles: ``,
})
export class EmploymentAndEmployerInfoFormCardComponent {
  form$: Observable<FormGroupState<formReducer.Form>>;
  remaining$: Observable<number>;
  isInProgress$: Observable<boolean>;

  constructor(
    private readonly store: Store,
    protected readonly router: Router,
  ) {
    this.form$ = this.store.select(formSelectors.selectForm);
    this.remaining$ = this.store
      .select(formSelectors.selectEmploymentAndEmployerInfoForm)
      .pipe(
        map(
          (form) => form.userDefinedProperties['mandatory'] - form.userDefinedProperties['valid'],
        ),
      );
    this.isInProgress$ = this.remaining$.pipe(map((remaining) => remaining !== 0));
  }
}
