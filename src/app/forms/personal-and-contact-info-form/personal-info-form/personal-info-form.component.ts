import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';

import * as personalInfo from '../../../state/form/forms/personal-and-contact-info/personal-info.form';

@Component({
  selector: 'personal-info-form',
  imports: [CommonModule, FormsModule, NgbDatepicker, NgrxFormsModule],
  templateUrl: './personal-info-form.component.html',
  styles: ``,
})
export class PersonalInfoFormComponent {
  @Input() form: FormGroupState<personalInfo.PersonalInfoForm> | null = null;
}
