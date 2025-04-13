import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';

import { BinaryRadioGroupComponent } from '../../../form-controls/binary-radio-group/binary-radio-group.component';
import { MultiRadioGroupComponent } from '../../../form-controls/multi-radio-group/multi-radio-group.component';
import { TextAreaComponent } from '../../../form-controls/text-area/text-area.component';
import { BodyPart } from '../../../state/form/injury-and-incident/body-part';
import { injuryAndIncidentActions } from '../../../state/form/injury-and-incident.actions';
import * as injuryDetails from '../../../state/form/injury-and-incident/injury-details.form';

@Component({
  selector: 'injury-details-form',
  imports: [
    BinaryRadioGroupComponent,
    MultiRadioGroupComponent,
    NgrxFormsModule,
    TextAreaComponent,
  ],
  templateUrl: './injury-details-form.component.html',
  styles: ``,
})
export class InjuryDetailsFormComponent {
  @Input({ required: true }) form!: FormGroupState<injuryDetails.Form>;

  constructor(private readonly store: Store) {}

  onChange(event: Event, id: BodyPart) {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      this.store.dispatch(injuryAndIncidentActions.addBodyPart({ id }));
    } else {
      this.store.dispatch(injuryAndIncidentActions.removeBodyPart({ id }));
    }
  }
}
