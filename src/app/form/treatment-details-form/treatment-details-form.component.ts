import { Component } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';
import { Observable } from 'rxjs';

import { BinaryRadioGroupComponent } from '../../form-controls/binary-radio-group/binary-radio-group.component';
import { CheckboxComponent } from '../../form-controls/checkbox/checkbox.component';
import { TextAreaComponent } from '../../form-controls/text-area/text-area.component';
import * as formSelectors from '../../state/form/form.selectors';
import * as form from '../../state/form/treatment-details/treatment-details.form';
import { TextInputComponent } from '../../form-controls/text-input/text-input.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'treatment-details-form',
  imports: [
    LetDirective,
    BinaryRadioGroupComponent,
    CheckboxComponent,
    NgrxFormsModule,
    TextAreaComponent,
    TextInputComponent,
    RouterLink,
  ],
  templateUrl: './treatment-details-form.component.html',
  styles: ``,
})
export class TreatmentDetailsFormComponent {
  form$: Observable<FormGroupState<form.Form>>;

  constructor(private readonly store: Store) {
    this.form$ = this.store.select(formSelectors.selectTreatmentDetailsFrom);
  }
}
