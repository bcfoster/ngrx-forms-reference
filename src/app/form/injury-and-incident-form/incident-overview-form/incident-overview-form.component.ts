import { NgIf } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroupState, NgrxFormsModule, SetValueAction } from 'ngrx-forms';
import { map, Observable } from 'rxjs';

import { CheckboxComponent } from '../../../form-controls/checkbox/checkbox.component';
import { MultiRadioGroupComponent } from '../../../form-controls/multi-radio-group/multi-radio-group.component';
import { TextAreaComponent } from '../../../form-controls/text-area/text-area.component';
import * as formSelectors from '../../../state/form/form.selectors';
import * as incidentOverview from '../../../state/form/injury-and-incident/incident-overview.form';

@Component({
  selector: 'incident-overview-form',
  imports: [
    TextAreaComponent,
    NgrxFormsModule,
    CheckboxComponent,
    NgIf,
    PushPipe,
    MultiRadioGroupComponent,
  ],
  templateUrl: './incident-overview-form.component.html',
  styles: ``,
})
export class IncidentOverviewFormComponent {
  @Input({ required: true }) form!: FormGroupState<incidentOverview.Form>;

  isInjuryRecent$: Observable<boolean>; // within the previous 7 days

  constructor(private readonly store: Store) {
    this.isInjuryRecent$ = this.store.select(formSelectors.selectIncidentAndInjuryForm).pipe(
      map((form) => form.value.incidentOverview),
      map(({ injuryDate, injuryTime }) => {
        const now = new Date();
        const date = new Date(Date.parse(`${injuryDate}T${injuryTime}Z`));
        return date > new Date(now.setDate(now.getDate() - 7));
      }),
    );
  }

  clearInjuryTime() {
    this.store.dispatch(new SetValueAction(this.form.controls.injuryTime.id, '00:00'));
  }
}
