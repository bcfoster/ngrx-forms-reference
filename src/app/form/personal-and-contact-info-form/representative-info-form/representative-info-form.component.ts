import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';

import * as representativeInfo from '../../../state/form/personal-and-contact-info/representative-information.form';
import { TextInputComponent } from '../../../form-controls/text-input/text-input.component';
import { SelectOptionComponent } from '../../../form-controls/select-option/select-option.component';
import { TextAreaComponent } from '../../../form-controls/text-area/text-area.component';

@Component({
  selector: 'representative-info-form',
  imports: [
    CommonModule,
    NgrxFormsModule,
    TextInputComponent,
    SelectOptionComponent,
    TextAreaComponent,
  ],
  templateUrl: './representative-info-form.component.html',
  styles: ``,
})
export class RepresentativeInfoFormComponent {
  @Input({ required: true }) form!: FormGroupState<representativeInfo.Form>;
}
