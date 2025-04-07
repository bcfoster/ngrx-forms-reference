import { Component, Input } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';
import * as incidentDetails from '../../../../state/form/forms/injury-and-incident/incident-details.form';

@Component({
  selector: 'incident-details-form',
  imports: [],
  templateUrl: './incident-details-form.component.html',
  styles: ``,
})
export class IncidentDetailsFormComponent {
  @Input({ required: true }) form!: FormGroupState<incidentDetails.Form>;
}
