import { Component, Input } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import * as incidentDetails from '../../../../state/form/forms/injury-and-incident/incident-details.form';
import { BinaryRadioGroupComponent } from '../../../controls/binary-radio-group/binary-radio-group.component';
import { MultiRadioGroupComponent } from '../../../controls/multi-radio-group/multi-radio-group.component';
import { TextAreaComponent } from '../../../controls/text-area/text-area.component';

@Component({
  selector: 'incident-details-form',
  imports: [BinaryRadioGroupComponent, MultiRadioGroupComponent, TextAreaComponent],
  templateUrl: './incident-details-form.component.html',
  styles: ``,
})
export class IncidentDetailsFormComponent {
  @Input({ required: true }) form!: FormGroupState<incidentDetails.Form>;
}
