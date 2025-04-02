import { Component, Input } from '@angular/core';
import { FormControlState, NgrxFormsModule } from 'ngrx-forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'binary-radio-group',
  imports: [NgrxFormsModule, NgClass],
  templateUrl: './binary-radio-group.component.html',
  styleUrl: './binary-radio-group.component.css',
})
export class BinaryRadioGroupComponent {
  @Input({ required: true }) control: FormControlState<boolean | null> | null = null;
  @Input({ required: true }) label = '';
  @Input() horizontal = false;
  @Input() optional: boolean | undefined;
  @Input() trueLabel: string | undefined;
  @Input() falseLabel: string | undefined;

  get options(): { key: boolean; value: string }[] {
    return [
      { key: true, value: this.trueLabel ?? 'Yes' },
      { key: false, value: this.falseLabel ?? 'No' },
    ];
  }

  get id(): string {
    return (
      this.label
        .replace(/\s+/g, '-')
        .replace(/[^\w/-]/gi, '')
        .toLowerCase() ?? ''
    );
  }
}
