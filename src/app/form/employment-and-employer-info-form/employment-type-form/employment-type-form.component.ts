import { Component, Input } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';

import { BinaryRadioGroupComponent } from '../../../form-controls/binary-radio-group/binary-radio-group.component';
import { MultiRadioGroupComponent } from '../../../form-controls/multi-radio-group/multi-radio-group.component';
import { TextInputComponent } from '../../../form-controls/text-input/text-input.component';
import * as empInfo from '../../../state/form/employment-and-employer-info/employment-and-employer-info.form';

@Component({
  selector: 'employment-type-form',
  imports: [BinaryRadioGroupComponent, MultiRadioGroupComponent, TextInputComponent],
  templateUrl: './employment-type-form.component.html',
  styles: ``,
})
export class EmploymentTypeFormComponent {
  @Input({ required: true }) form!: FormGroupState<empInfo.EmploymentDetailsForm>;
  @Input({ required: true }) isTimelossInjury = false;
}
