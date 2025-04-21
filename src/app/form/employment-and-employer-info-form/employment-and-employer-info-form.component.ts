import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { LetDirective, PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';
import { Observable } from 'rxjs';

import { EarningsFormComponent } from './earnings-form/earnings-form.component';
import { EmployerDetailsFormComponent } from './employer-details-form/employer-details-form.component';
import { EmploymentDetailsFormComponent } from './employment-details-form/employment-details-form.component';
import { EmploymentTypeFormComponent } from './employment-type-form/employment-type-form.component';
import { ReturnToWorkFormComponent } from './return-to-work-form/return-to-work-form.component';
import { ShiftInfoFormComponent } from './shift-info-form/shift-info-form.component';
import { TextAreaComponent } from '../../form-controls/text-area/text-area.component';
import { BinaryRadioGroupComponent } from '../../form-controls/binary-radio-group/binary-radio-group.component';
import * as form from '../../state/form/employment-and-employer-info/employment-and-employer-info.form';
import * as formSelectors from '../../state/form/form.selectors';

@Component({
  selector: 'employment-and-employer-info-form',
  imports: [
    BinaryRadioGroupComponent,
    EarningsFormComponent,
    EmployerDetailsFormComponent,
    EmploymentDetailsFormComponent,
    EmploymentTypeFormComponent,
    LetDirective,
    NgrxFormsModule,
    PushPipe,
    ReturnToWorkFormComponent,
    RouterLink,
    ShiftInfoFormComponent,
    TextAreaComponent,
  ],
  templateUrl: './employment-and-employer-info-form.component.html',
  styles: ``,
})
export class EmploymentAndEmployerInfoFormComponent {
  form$: Observable<FormGroupState<form.Form>>;
  isTimelossInjury$: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.form$ = this.store.select(formSelectors.selectEmploymentAndEmployerInfoForm);
    this.isTimelossInjury$ = this.store.select(formSelectors.selectIsTimelossInjury);
  }
}
