import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormGroupState, NgrxFormsModule, ResetAction } from 'ngrx-forms';
import { Observable } from 'rxjs';

import * as contact from '../../state/form/forms/contact.form';
import * as formSelectors from '../../state/form/form.selectors';
import * as fromForm from '../../state/form/form.reducer';

@Component({
  selector: 'contact-form',
  imports: [CommonModule, LetDirective, NgrxFormsModule, RouterLink],
  templateUrl: `./contact-form.component.html`,
})
export class ContactFormComponent {
  form$: Observable<FormGroupState<contact.Form>>;

  constructor(private readonly store: Store) {
    this.form$ = this.store.select(formSelectors.selectContactForm);
  }

  reset() {
    this.store.dispatch(new ResetAction(fromForm.initialFormState.id));
  }
}
