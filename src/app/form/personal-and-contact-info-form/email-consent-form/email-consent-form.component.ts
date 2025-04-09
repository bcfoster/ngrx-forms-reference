import { Component, Input } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';

import { BinaryRadioGroupComponent } from '../../../form-controls/binary-radio-group/binary-radio-group.component';
import * as emailConsent from '../../../state/form/personal-and-contact-info/email-consent.form';

@Component({
  selector: 'email-consent-form',
  imports: [BinaryRadioGroupComponent],
  templateUrl: './email-consent-form.component.html',
  styles: ``,
})
export class EmailConsentFormComponent {
  @Input({ required: true }) form!: FormGroupState<emailConsent.Form>;
}
