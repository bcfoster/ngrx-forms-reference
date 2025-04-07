import { Component, Input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';

@Component({
  selector: 'checkbox',
  imports: [NgrxFormsModule],
  templateUrl: './checkbox.component.html',
  styles: ``,
})
export class CheckboxComponent {
  @Input({ required: true }) control: FormControlState<boolean> | undefined;
  @Input({ required: true }) label = '';

  get id(): string {
    return (
      this.label
        ?.toLowerCase()
        .replace(' ', '-')
        .replace(/[^\w-]/gi, '') ?? ''
    );
  }
}
