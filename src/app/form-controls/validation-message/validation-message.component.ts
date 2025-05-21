import { Component, Input } from '@angular/core';
import { FormControlState, FormControlValueTypes, NgrxFormsModule } from 'ngrx-forms';

@Component({
  selector: 'validation-message',
  imports: [NgrxFormsModule],
  templateUrl: './validation-message.component.html',
  styles: '',
})
export class ValidationMessageComponent {
  @Input({ required: true }) for: FormControlState<FormControlValueTypes> | null = null;
  @Input() fieldName = 'Field';
}
