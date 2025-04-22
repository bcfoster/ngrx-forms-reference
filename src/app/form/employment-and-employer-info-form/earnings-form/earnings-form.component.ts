import { Component, Input } from '@angular/core';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';

import * as empInfo from '../../../state/form/employment-and-employer-info/employment-and-employer-info.form';
import { BinaryRadioGroupComponent } from '../../../form-controls/binary-radio-group/binary-radio-group.component';
import { CheckboxComponent } from '../../../form-controls/checkbox/checkbox.component';
import { MultiRadioGroupComponent } from '../../../form-controls/multi-radio-group/multi-radio-group.component';
import { SelectOptionComponent } from '../../../form-controls/select-option/select-option.component';
import { TextAreaComponent } from '../../../form-controls/text-area/text-area.component';

@Component({
  selector: 'earnings-form',
  imports: [
    BinaryRadioGroupComponent,
    CheckboxComponent,
    MultiRadioGroupComponent,
    NgrxFormsModule,
    SelectOptionComponent,
    TextAreaComponent,
  ],
  templateUrl: './earnings-form.component.html',
  styles: ``,
})
export class EarningsFormComponent {
  @Input({ required: true }) form!: FormGroupState<empInfo.EarningsForm>;
}
