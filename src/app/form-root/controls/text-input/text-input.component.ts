import { Component, Input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'text-input',
  imports: [NgClass, NgrxFormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css',
})
export class TextInputComponent {
  @Input({ required: true }) control: FormControlState<string> | null = null;
  @Input() optional: boolean | undefined;
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
