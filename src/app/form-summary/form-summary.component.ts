import { Component } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as formReducer from '../state/form/form.reducer';
import * as formSelectors from '../state/form/form.selectors';

@Component({
  selector: 'form-summary',
  imports: [PushPipe],
  templateUrl: 'form-summary.component.html',
})
export class FormSummaryComponent {
  form$: Observable<formReducer.Form>;

  constructor(private readonly store: Store) {
    this.form$ = this.store.select(formSelectors.selectFormValue);
  }
}
