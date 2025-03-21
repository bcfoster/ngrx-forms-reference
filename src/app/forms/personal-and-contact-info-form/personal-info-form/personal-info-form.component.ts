import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDate, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { FormGroupState, NgrxFormsModule, SetValueAction } from 'ngrx-forms';

import * as formReducer from '../../../state/form/form.reducer';
import * as personalInfo from '../../../state/form/forms/personal-and-contact-info/personal-info.form';

@Component({
  selector: 'personal-info-form',
  imports: [CommonModule, FormsModule, NgbDatepicker, NgrxFormsModule],
  templateUrl: './personal-info-form.component.html',
  styles: ``,
})
export class PersonalInfoFormComponent {
  @Input() form: FormGroupState<personalInfo.Form> | null = null;

  constructor(private readonly store: Store) {}

  setDateOfBirth(date: NgbDate) {
    this.store.dispatch(
      new SetValueAction(
        formReducer.initialFormState.controls.personalAndContactInfo.controls.personalInformation.controls.dateOfBirth.id,
        new Date(date.year, date.month - 1, date.day).toISOString(),
      ),
    );
  }
}
