import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  AddArrayControlAction,
  FormGroupState,
  NgrxFormsModule,
  RemoveArrayControlAction,
} from 'ngrx-forms';

import { BinaryRadioGroupComponent } from '../../../form-controls/binary-radio-group/binary-radio-group.component';
import { MultiRadioGroupComponent } from '../../../form-controls/multi-radio-group/multi-radio-group.component';
import { TextAreaComponent } from '../../../form-controls/text-area/text-area.component';
import { TextInputComponent } from '../../../form-controls/text-input/text-input.component';
import * as empInfo from '../../../state/form/employment-and-employer-info/employment-and-employer-info.form';
import { CheckboxComponent } from '../../../form-controls/checkbox/checkbox.component';

@Component({
  selector: 'shift-info-form',
  imports: [
    BinaryRadioGroupComponent,
    MultiRadioGroupComponent,
    NgIf,
    NgrxFormsModule,
    TextAreaComponent,
    TextInputComponent,
    CheckboxComponent,
  ],
  templateUrl: './shift-info-form.component.html',
  styles: ``,
})
export class ShiftInfoFormComponent {
  @Input({ required: true }) form!: FormGroupState<empInfo.ShiftInformationForm>;

  constructor(private readonly store: Store) {}

  add() {
    const id = this.form.controls.shiftPattern.controls.pattern.id;
    const pattern = {
      daysOn: 0,
      daysOff: 0,
    };
    this.store.dispatch(new AddArrayControlAction(id, pattern));
  }

  remove(i: number) {
    const id = this.form.controls.shiftPattern.controls.pattern.id;
    this.store.dispatch(new RemoveArrayControlAction(id, i));
  }
}
