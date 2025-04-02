import { Component, Input } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';

import * as emailConsent from '../../../../state/form/forms/personal-and-contact-info/email-consent.form';
import { BinaryRadioGroupComponent } from '../../../controls/binary-radio-group/binary-radio-group.component';

@Component({
  selector: 'email-consent-form',
  imports: [BinaryRadioGroupComponent],
  templateUrl: './email-consent-form.component.html',
  styles: ``,
})
export class EmailConsentFormComponent {
  @Input({ required: true }) form!: FormGroupState<emailConsent.Form>;
}
