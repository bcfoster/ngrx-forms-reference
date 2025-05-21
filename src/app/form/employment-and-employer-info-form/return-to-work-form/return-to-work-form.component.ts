import { Component, Input } from '@angular/core';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';

import * as empInfo from '../../../state/form/employment-and-employer-info/employment-and-employer-info.form';
import { MultiRadioGroupComponent } from '../../../form-controls/multi-radio-group/multi-radio-group.component';
import { CheckboxComponent } from '../../../form-controls/checkbox/checkbox.component';
import { BinaryRadioGroupComponent } from '../../../form-controls/binary-radio-group/binary-radio-group.component';
import { TextAreaComponent } from '../../../form-controls/text-area/text-area.component';

@Component({
  selector: 'return-to-work-form',
  imports: [
    MultiRadioGroupComponent,
    NgrxFormsModule,
    CheckboxComponent,
    BinaryRadioGroupComponent,
    TextAreaComponent,
  ],
  templateUrl: './return-to-work-form.component.html',
  styles: ``,
})
export class ReturnToWorkFormComponent {
  @Input({ required: true }) form!: FormGroupState<empInfo.ReturnToWorkForm>;
}
