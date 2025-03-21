import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { FormGroupState, NgrxFormsModule, ResetAction } from 'ngrx-forms';
import { Observable } from 'rxjs';

import * as form from '../../state/form/forms/personal-and-contact-info.form';
import * as formReducer from '../../state/form/form.reducer';
import * as formSelectors from '../../state/form/form.selectors';
import { PersonalInfoFormComponent } from './personal-info-form/personal-info-form.component';
import { RepresentativeInfoFormComponent } from './representative-info-form/representative-info-form.component';

@Component({
  selector: 'app-personal-and-contact-info-form',
  imports: [
    FormsModule,
    NgrxFormsModule,
    LetDirective,
    RouterLink,
    PersonalInfoFormComponent,
    RepresentativeInfoFormComponent,
  ],
  templateUrl: 'personal-and-contact-info-form.component.html',
  styles: ``,
})
export class PersonalAndContactInfoFormComponent {
  form$: Observable<FormGroupState<form.Form>>;

  constructor(private readonly store: Store) {
    this.form$ = this.store.select(formSelectors.selectPersonalAndContactInfoForm);
  }

  reset() {
    this.store.dispatch(
      new ResetAction(formReducer.initialFormState.controls.personalAndContactInfo.id),
    );
  }
}
