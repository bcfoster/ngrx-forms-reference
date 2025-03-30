import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormGroupState, NgrxFormsModule } from 'ngrx-forms';

import * as formSelectors from '../../../../state/form/form.selectors';
import * as personalInfo from '../../../../state/form/forms/personal-and-contact-info/personal-info.form';
import { filter, map, Observable, of } from 'rxjs';
import { PushPipe } from '@ngrx/component';

@Component({
  selector: 'personal-info-form',
  imports: [CommonModule, FormsModule, NgrxFormsModule, PushPipe],
  templateUrl: './personal-info-form.component.html',
  styles: ``,
})
export class PersonalInfoFormComponent {
  @Input({ required: true }) form: FormGroupState<personalInfo.Form> | null = null;

  days$: Observable<number[]> = of([1, 2, 3, 4, 5]);

  constructor(private readonly store: Store) {
    this.days$ = this.store.select(formSelectors.selectPersonalAndContactInfoForm).pipe(
      map((form) => form.value.personalInformation.dateOfBirth),
      filter((dob) => !isNaN(+dob.year) && !isNaN(+dob.month)),
      map((dob) =>
        [...Array(new Date(+dob.year, +dob.month + 1, 0).getDate())].map((_, index) => index + 1),
      ),
    );
  }

  get months(): { displayValue: string; value: number }[] {
    const values = [];

    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
      const year = new Date().getFullYear();
      const month = new Date(year, monthIndex);
      values.push({
        displayValue: month.toLocaleString('default', { month: 'long' }),
        value: monthIndex,
      });
    }

    return values;
  }

  get years(): number[] {
    const values = [];

    const year = new Date().getFullYear();
    for (let y = year - 12; y >= year - 100; y--) {
      values.push(y);
    }

    return values;
  }
}
