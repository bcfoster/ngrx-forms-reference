import { Component, Input } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';

import { BinaryRadioGroupComponent } from '../../../form-controls/binary-radio-group/binary-radio-group.component';
import { MultiRadioGroupComponent } from '../../../form-controls/multi-radio-group/multi-radio-group.component';
import { TextAreaComponent } from '../../../form-controls/text-area/text-area.component';
import * as incidentDetails from '../../../state/form/injury-and-incident/incident-details.form';

@Component({
  selector: 'incident-details-form',
  imports: [BinaryRadioGroupComponent, MultiRadioGroupComponent, TextAreaComponent],
  templateUrl: './incident-details-form.component.html',
  styles: ``,
})
export class IncidentDetailsFormComponent {
  @Input({ required: true }) form!: FormGroupState<incidentDetails.Form>;
}
