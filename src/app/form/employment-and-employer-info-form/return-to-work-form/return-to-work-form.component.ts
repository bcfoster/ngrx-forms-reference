import { Component, Input } from '@angular/core';
import { FormGroupState } from 'ngrx-forms';

import * as empInfo from '../../../state/form/employment-and-employer-info/employment-and-employer-info.form';

@Component({
  selector: 'return-to-work-form',
  imports: [],
  templateUrl: './return-to-work-form.component.html',
  styles: ``,
})
export class ReturnToWorkFormComponent {
  @Input({ required: true }) form!: FormGroupState<empInfo.ReturnToWorkForm>;
}
