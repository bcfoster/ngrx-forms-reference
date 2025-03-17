import { Component, Input } from '@angular/core';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';

import * as representativeInfo from '../../../state/form/forms/personal-and-contact-info/representative-info.form';

@Component({
  selector: 'representative-info-form',
  imports: [NgrxFormsModule],
  templateUrl: './representative-info-form.component.html',
  styles: ``,
})
export class RepresentativeInfoFormComponent {
  @Input() form: FormGroupState<representativeInfo.RepresentativeInfoForm> | null = null;
}
