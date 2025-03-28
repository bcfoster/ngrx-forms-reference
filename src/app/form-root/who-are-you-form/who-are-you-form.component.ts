import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as formReducer from '../../state/form/form.reducer';
import { SetValueAction } from 'ngrx-forms';

@Component({
  selector: 'app-who-are-you-form',
  imports: [],
  template: `
    <div class="mx-auto w-1/2">
      <h1 class="mb-4 text-2xl leading-none font-bold text-gray-900">Are you the person who was injured?</h1>
      
      <div class="flex gap-2">
        <button
          type="button"
          class="me-2 cursor-pointer rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          (click)="yes()"
        >
          Yes, I am the injured worker
        </button>
        
        <button
          type="button"
          class="me-2 cursor-pointer rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          (click)=" no()"
        >
          No, I am reporting on behalf of the injured worker
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export class WhoAreYouFormComponent {
  constructor(private readonly store: Store) {}

  yes() {
    this.store.dispatch(
      new SetValueAction(
        formReducer.initialFormState.controls.personalAndContactInfo.controls.representativeInformation.controls.reportingForSelf.id,
        true,
      ),
    );
  }

  no() {
    this.store.dispatch(
      new SetValueAction(
        formReducer.initialFormState.controls.personalAndContactInfo.controls.representativeInformation.controls.reportingForSelf.id,
        false,
      ),
    );
  }
}
