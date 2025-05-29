import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, tap, withLatestFrom } from 'rxjs';

import { draftActions } from './drafts.actions';
import * as draftSelectors from './drafts.selectors';
import { formActions } from '../form/form.actions';
import * as formSelectors from '../form/form.selectors';

@Injectable()
export class DraftsEffects {
  readonly SAVED_FORMS_KEY = 'forms';

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
  ) {
    this.enrichDraft$ = createEffect(() =>
      actions$.pipe(
        ofType(formActions.save),
        withLatestFrom(
          this.store.select(draftSelectors.selectActiveDraftId),
          this.store.select(formSelectors.selectLastEdited),
          this.store.select(formSelectors.selectFormPercentComplete),
          this.store.select(formSelectors.selectFormValue),
        ),
        filter(([, id]) => !!id),
        map(([, id, lastEdited, percentComplete, form]) =>
          draftActions.updated({ id: id!, lastEdited, percentComplete, form }),
        ),
      ),
    );

    this.loadDraft$ = createEffect(() =>
      actions$.pipe(
        ofType(formActions.continue, formActions.submit),
        withLatestFrom(this.store.select(draftSelectors.selectActiveDraftFormJson)),
        filter(([, form]) => !!form),
        map(([, form]) => draftActions.draftLoaded({ form: JSON.parse(form!) })),
      ),
    );

    this.loadDrafts$ = createEffect(() =>
      actions$.pipe(
        ofType(draftActions.loadDrafts),
        map(() => {
          const json = localStorage.getItem(this.SAVED_FORMS_KEY);

          return json
            ? draftActions.draftsLoaded({ forms: JSON.parse(json) })
            : draftActions.draftsLoadFailed();
        }),
      ),
    );

    this.update$ = createEffect(
      () =>
        actions$.pipe(
          ofType(draftActions.updated, formActions.remove, formActions.start),
          withLatestFrom(this.store.select(draftSelectors.selectAll)),
          tap(([, forms]) => localStorage.setItem(this.SAVED_FORMS_KEY, JSON.stringify(forms))),
        ),
      { dispatch: false },
    );
  }

  enrichDraft$;
  loadDraft$;
  loadDrafts$;
  update$;
}
