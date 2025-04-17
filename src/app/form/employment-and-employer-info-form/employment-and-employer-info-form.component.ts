import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';
import { Observable } from 'rxjs';

import { EmploymentTypeFormComponent } from './employment-type-form/employment-type-form.component';
import * as form from '../../state/form/employment-and-employer-info/employment-and-employer-info.form';
import * as formSelectors from '../../state/form/form.selectors';
import { EmployerDetailsFormComponent } from './employer-details-form/employer-details-form.component';

@Component({
  selector: 'employment-and-employer-info-form',
  imports: [
    EmploymentTypeFormComponent,
    LetDirective,
    NgrxFormsModule,
    RouterLink,
    EmployerDetailsFormComponent,
  ],
  templateUrl: './employment-and-employer-info-form.component.html',
  styles: ``,
})
export class EmploymentAndEmployerInfoFormComponent {
  form$: Observable<FormGroupState<form.Form>>;

  constructor(private readonly store: Store) {
    this.form$ = this.store.select(formSelectors.selectEmploymentAndEmployerInfoForm);
  }
}
