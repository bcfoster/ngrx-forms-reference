import { Component, Input } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';

import { SelectOptionComponent } from '../../../form-controls/select-option/select-option.component';
import { TextInputComponent } from '../../../form-controls/text-input/text-input.component';
import * as contactInfo from '../../../state/form/personal-and-contact-info/contact-info.form';

@Component({
  selector: 'contact-info-form',
  imports: [SelectOptionComponent, TextInputComponent],
  templateUrl: './contact-info-form.component.html',
  styles: ``,
})
export class ContactInfoFormComponent {
  @Input({ required: true }) form!: FormGroupState<contactInfo.Form>;
}
