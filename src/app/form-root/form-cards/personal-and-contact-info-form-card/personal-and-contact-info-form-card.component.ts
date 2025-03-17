import { PercentPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { FormGroupState } from 'ngrx-forms';
import { map, Observable } from 'rxjs';

import * as formReducer from '../../../state/form/form.reducer';
import * as formSelectors from '../../../state/form/form.selectors';

@Component({
  selector: 'personal-and-contact-info-form-card',
  imports: [PercentPipe, PushPipe, RouterLink],
  templateUrl: 'personal-and-contact-info-form-card.component.html',
  styles: ``,
})
export class PersonalAndContactInfoFormCardComponent {
  form$: Observable<FormGroupState<formReducer.Form>>;
  percentComplete$: Observable<number>;
  isInProgress$: Observable<boolean>;

  constructor(
    private readonly store: Store,
    protected readonly router: Router,
  ) {
    this.form$ = this.store.select(formSelectors.selectForm);
    this.percentComplete$ = this.store.select(
      formSelectors.selectPersonalAndContactInfoFormPercentComplete,
    );
    this.isInProgress$ = this.percentComplete$.pipe(map((percent) => percent > 0));
  }
}
