import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';
import { Observable } from 'rxjs';

import { ContactInfoFormComponent } from './contact-info-form/contact-info-form.component';
import { EmailConsentFormComponent } from './email-consent-form/email-consent-form.component';
import { PersonalInfoFormComponent } from './personal-info-form/personal-info-form.component';
import { RepresentativeInfoFormComponent } from './representative-info-form/representative-info-form.component';
import { BinaryRadioGroupComponent } from '../../form-controls/binary-radio-group/binary-radio-group.component';
import * as form from '../../state/form/personal-and-contact-info/personal-and-contact-info.form';
import * as formSelectors from '../../state/form/form.selectors';

@Component({
  selector: 'personal-and-contact-info-form',
  imports: [
    FormsModule,
    NgrxFormsModule,
    LetDirective,
    RouterLink,
    PersonalInfoFormComponent,
    RepresentativeInfoFormComponent,
    BinaryRadioGroupComponent,
    ContactInfoFormComponent,
    EmailConsentFormComponent,
  ],
  templateUrl: 'personal-and-contact-info-form.component.html',
  styles: ``,
})
export class PersonalAndContactInfoFormComponent {
  form$: Observable<FormGroupState<form.Form>>;

  constructor(private readonly store: Store) {
    this.form$ = this.store.select(formSelectors.selectPersonalAndContactInfoForm);
  }
}
