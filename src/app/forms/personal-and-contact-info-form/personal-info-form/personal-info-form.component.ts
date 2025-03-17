import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';

import * as personalInfo from '../../../state/form/forms/personal-and-contact-info/personal-info.form';

@Component({
  selector: 'personal-info-form',
  imports: [CommonModule, FormsModule, NgrxFormsModule],
  templateUrl: './personal-info-form.component.html',
  styles: ``,
})
export class PersonalInfoFormComponent {
  @Input() form: FormGroupState<personalInfo.PersonalInfoForm> | null = null;

  protected readonly hasClaimNumber: boolean | null = null;
}
