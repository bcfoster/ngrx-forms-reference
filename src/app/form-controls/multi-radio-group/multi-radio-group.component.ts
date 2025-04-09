import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';

// TODO: can share a base class with binary-radio-group
@Component({
  selector: 'multi-radio-group',
  imports: [NgrxFormsModule, NgClass],
  templateUrl: './multi-radio-group.component.html',
  styles: '',
})
export class MultiRadioGroupComponent {
  @Input({ required: true }) control: FormControlState<string> | null = null;
  @Input({ required: true }) label = '';
  @Input({ required: true }) options: { key: string; value: string }[] = [];
  @Input() horizontal = false;
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
