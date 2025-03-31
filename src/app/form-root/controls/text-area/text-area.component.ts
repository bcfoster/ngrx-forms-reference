import { Component, Input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'text-area',
  imports: [NgrxFormsModule, NgClass],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.css',
})
export class TextAreaComponent {
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
