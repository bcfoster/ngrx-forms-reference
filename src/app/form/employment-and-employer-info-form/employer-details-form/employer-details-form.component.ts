import { Component, Input } from '@angular/core';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';

import * as empInfo from '../../../state/form/employment-and-employer-info/employment-and-employer-info.form';
import { TextInputComponent } from '../../../form-controls/text-input/text-input.component';
import { SelectOptionComponent } from '../../../form-controls/select-option/select-option.component';
import { BinaryRadioGroupComponent } from '../../../form-controls/binary-radio-group/binary-radio-group.component';
import { CheckboxComponent } from '../../../form-controls/checkbox/checkbox.component';

@Component({
  selector: 'employer-details-form',
  imports: [
    TextInputComponent,
    SelectOptionComponent,
    BinaryRadioGroupComponent,
    CheckboxComponent,
    NgrxFormsModule,
  ],
  templateUrl: './employer-details-form.component.html',
  styles: ``,
})
export class EmployerDetailsFormComponent {
  @Input({ required: true }) form!: FormGroupState<empInfo.EmployerInformationForm>;
}
