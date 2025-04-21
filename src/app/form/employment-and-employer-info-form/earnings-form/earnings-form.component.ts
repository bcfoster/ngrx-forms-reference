import { Component, Input } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';

import * as empInfo from '../../../state/form/employment-and-employer-info/employment-and-employer-info.form';

@Component({
  selector: 'earnings-form',
  imports: [],
  templateUrl: './earnings-form.component.html',
  styles: ``,
})
export class EarningsFormComponent {
  @Input({ required: true }) form!: FormGroupState<empInfo.EarningsForm>;
}
