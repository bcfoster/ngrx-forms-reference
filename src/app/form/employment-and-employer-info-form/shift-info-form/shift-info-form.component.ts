import { Component, Input } from '@angular/core';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';

import { BinaryRadioGroupComponent } from '../../../form-controls/binary-radio-group/binary-radio-group.component';
import { MultiRadioGroupComponent } from '../../../form-controls/multi-radio-group/multi-radio-group.component';
import { TextAreaComponent } from '../../../form-controls/text-area/text-area.component';
import { TextInputComponent } from '../../../form-controls/text-input/text-input.component';
import * as empInfo from '../../../state/form/employment-and-employer-info/employment-and-employer-info.form';

@Component({
  selector: 'shift-info-form',
  imports: [
    BinaryRadioGroupComponent,
    MultiRadioGroupComponent,
    NgrxFormsModule,
    TextAreaComponent,
    TextInputComponent,
  ],
  templateUrl: './shift-info-form.component.html',
  styles: ``,
})
export class ShiftInfoFormComponent {
  @Input({ required: true }) form!: FormGroupState<empInfo.ShiftInformationForm>;
}
