import { Component, Input } from '@angular/core';
import { FormControlState, FormControlValueTypes, NgrxFormsModule } from 'ngrx-forms';

@Component({
  selector: 'validation-errors',
  imports: [NgrxFormsModule],
  templateUrl: './validation-errors.component.html',
  styles: '',
})
export class ValidationErrorsComponent {
  @Input({ required: true }) control: FormControlState<FormControlValueTypes> | null = null;
  @Input() fieldName = 'Field';
}
