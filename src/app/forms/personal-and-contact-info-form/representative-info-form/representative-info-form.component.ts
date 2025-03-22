import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import * as representativeInfo from '../../../state/form/forms/personal-and-contact-info/representative-information.form';

@Component({
  selector: 'representative-info-form',
  imports: [CommonModule, NgbAlertModule, NgrxFormsModule],
  templateUrl: './representative-info-form.component.html',
  styles: ``,
})
export class RepresentativeInfoFormComponent {
  @Input() form: FormGroupState<representativeInfo.Form> | null = null;
}
