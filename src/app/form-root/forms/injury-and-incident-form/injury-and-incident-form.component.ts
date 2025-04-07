import { LetDirective } from '@ngrx/component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';
import { Observable } from 'rxjs';

import { IncidentOverviewFormComponent } from './incident-overview-form/incident-overview-form.component';
import * as form from '../../../state/form/forms/injury-and-incident.form';
import * as formSelectors from '../../../state/form/form.selectors';

@Component({
  selector: 'injury-and-incident-form',
  imports: [IncidentOverviewFormComponent, LetDirective, NgrxFormsModule, RouterLink],
  templateUrl: './injury-and-incident-form.component.html',
  styles: ``,
})
export class InjuryAndIncidentFormComponent {
  form$: Observable<FormGroupState<form.Form>>;

  constructor(private readonly store: Store) {
    this.form$ = this.store.select(formSelectors.selectIncidentAndInjuryForm);
  }
}
