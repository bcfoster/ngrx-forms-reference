import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';

@Component({
  selector: 'select-option',
  imports: [NgClass, NgrxFormsModule],
  templateUrl: './select-option.component.html',
  styleUrl: './select-option.component.css',
})
export class SelectOptionComponent {
  @Input({ required: true }) control: FormControlState<string> | null = null;
  @Input({ required: true }) label = '';
  @Input({ required: true }) default = '';
  @Input({ required: true }) options: { key: string; value: string }[] = [];
  @Input() optional: boolean | undefined;

  get id(): string {
    return (
      this.label
        .replace(/\s+/g, '-')
        .replace(/[^\w/-]/gi, '')
        .toLowerCase() ?? ''
    );
  }
}
