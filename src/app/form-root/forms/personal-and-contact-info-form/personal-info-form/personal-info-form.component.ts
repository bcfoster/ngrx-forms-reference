import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';

import * as personalInfo from '../../../../state/form/forms/personal-and-contact-info/personal-info.form';
import { TextInputComponent } from '../../../controls/text-input/text-input.component';
import { BinaryRadioGroupComponent } from '../../../controls/binary-radio-group/binary-radio-group.component';
import { MultiRadioGroupComponent } from '../../../controls/multi-radio-group/multi-radio-group.component';
import { SelectOptionComponent } from '../../../controls/select-option/select-option.component';
import { TextAreaComponent } from '../../../controls/text-area/text-area.component';

@Component({
  selector: 'personal-info-form',
  imports: [
    CommonModule,
    FormsModule,
    NgrxFormsModule,
    TextInputComponent,
    BinaryRadioGroupComponent,
    MultiRadioGroupComponent,
    SelectOptionComponent,
    TextAreaComponent,
  ],
  templateUrl: './personal-info-form.component.html',
  styles: ``,
})
export class PersonalInfoFormComponent {
  @Input({ required: true }) form: FormGroupState<personalInfo.Form> | null = null;

  @ViewChild('year') year!: ElementRef;
  @ViewChild('month') month!: ElementRef;
  @ViewChild('day') day!: ElementRef;

  onDateChanged(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.id === 'date-of-birth-year') {
      if (input.value.length === 4) {
        this.month.nativeElement.focus();
        this.month.nativeElement.select();
      }
    } else if (input.id === 'date-of-birth-month') {
      if (input.value.length === 0) {
        this.year.nativeElement.focus();
        this.year.nativeElement.select();
      } else if (input.value.length === 2) {
        this.day.nativeElement.focus();
        this.day.nativeElement.select();
      }
    } else if (input.id === 'date-of-birth-day') {
      if (input.value.length === 0) {
        this.month.nativeElement.focus();
        this.month.nativeElement.select();
      }
    }
  }
}
