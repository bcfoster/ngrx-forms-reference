import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';

@Component({
  selector: 'select-option',
  imports: [NgClass, NgrxFormsModule],
  templateUrl: './select-option.component.html',
  styles: '',
})
export class SelectOptionComponent {
  @Input({ required: true }) control: FormControlState<string> | null = null;
  @Input({ required: true }) label = '';
  @Input({ required: true }) options: { key: string; value: string }[] = [];
  @Input() defaultLabel: string | undefined;
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
