import { Component, Input } from '@angular/core';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';

import { CheckboxComponent } from '../../../controls/checkbox/checkbox.component';
import { BODY_PARTS } from '../../../../state/form/forms/injury-and-incident/body-parts';
import * as injuryDetails from '../../../../state/form/forms/injury-and-incident/injury-details.form';

@Component({
  selector: 'injury-details-form',
  imports: [CheckboxComponent, NgrxFormsModule],
  templateUrl: './injury-details-form.component.html',
  styles: ``,
})
export class InjuryDetailsFormComponent {
  @Input({ required: true }) form!: FormGroupState<injuryDetails.Form>;

  protected readonly HEAD = BODY_PARTS.HEAD;
  protected readonly TORSO = BODY_PARTS.TORSO;
  protected readonly ARM = BODY_PARTS.ARM;
  protected readonly LEG = BODY_PARTS.LEG;
}
