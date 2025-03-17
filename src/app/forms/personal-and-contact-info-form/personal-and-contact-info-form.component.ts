import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';
import { Observable } from 'rxjs';

import * as form from '../../state/form/forms/personal-and-contact-info.form';
import * as formSelectors from '../../state/form/form.selectors';

@Component({
  selector: 'app-personal-and-contact-info-form',
  imports: [NgrxFormsModule, LetDirective, RouterLink],
  templateUrl: 'personal-and-contact-info-form.component.html',
  styles: ``,
})
export class PersonalAndContactInfoFormComponent {
  form$: Observable<FormGroupState<form.Form>>;

  constructor(private readonly store: Store) {
    this.form$ = this.store.select(formSelectors.selectPersonalAndContactInfoForm);
  }

  reset() {
    return;
  }
}
