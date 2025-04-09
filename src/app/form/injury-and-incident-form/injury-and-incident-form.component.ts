import { LetDirective } from '@ngrx/component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';
import { Observable } from 'rxjs';

import { IncidentDetailsFormComponent } from './incident-details-form/incident-details-form.component';
import { IncidentOverviewFormComponent } from './incident-overview-form/incident-overview-form.component';
import { InjuryDetailsFormComponent } from './injury-details-form/injury-details-form.component';
import { TextAreaComponent } from '../../form-controls/text-area/text-area.component';
import * as form from '../../state/form/injury-and-incident/injury-and-incident.form';
import * as formSelectors from '../../state/form/form.selectors';

@Component({
  selector: 'injury-and-incident-form',
  imports: [
    IncidentOverviewFormComponent,
    InjuryDetailsFormComponent,
    LetDirective,
    NgrxFormsModule,
    RouterLink,
    IncidentDetailsFormComponent,
    TextAreaComponent,
  ],
  templateUrl: './injury-and-incident-form.component.html',
  styles: ``,
})
export class InjuryAndIncidentFormComponent {
  form$: Observable<FormGroupState<form.Form>>;

  constructor(private readonly store: Store) {
    this.form$ = this.store.select(formSelectors.selectIncidentAndInjuryForm);
  }
}
