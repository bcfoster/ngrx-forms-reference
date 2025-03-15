import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AddArrayControlAction, RemoveArrayControlAction, SetValueAction } from 'ngrx-forms';
import { filter, map, withLatestFrom } from 'rxjs';

import * as formSelectors from './form.selectors';

@Injectable()
export class FormEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
  ) {
    this.handleCheckboxesValueChange$ = createEffect(() =>
      actions$.pipe(
        ofType<SetValueAction<boolean>>(SetValueAction.TYPE),
        withLatestFrom(this.store.select(formSelectors.selectCheckboxesForm)),
        filter(([action, checkboxes]) => action.controlId.startsWith(checkboxes.id)),
        map(([action, checkboxes]) =>
          action.value
            ? new AddArrayControlAction(checkboxes.controls.selected.id, action.value)
            : new RemoveArrayControlAction(checkboxes.controls.selected.id, 0),
        ),
      ),
    );
  }

  handleCheckboxesValueChange$;
}
