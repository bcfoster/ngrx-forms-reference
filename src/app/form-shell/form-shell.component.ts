import { DatePipe, NgClass, PercentPipe } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { last, Observable } from 'rxjs';

import { draftActions } from '../state/drafts/drafts.actions';
import { formActions } from '../state/form/form.actions';
import * as draftsReducer from '../state/drafts/drafts.reducer';
import * as draftSelectors from '../state/drafts/drafts.selectors';

@Component({
  selector: 'form-shell',
  imports: [DatePipe, NgClass, PercentPipe, PushPipe, RouterLink],
  templateUrl: './form-shell.component.html',
})
export class FormShellComponent implements OnInit {
  readonly drafts$: Observable<draftsReducer.DraftForm[]>;

  constructor(private readonly store: Store) {
    this.drafts$ = this.store.select(draftSelectors.selectAll);
  }

  ngOnInit(): void {
    this.store.dispatch(draftActions.loadDrafts());
  }

  continue(id: string) {
    this.store.dispatch(formActions.continue({ id }));
  }

  remove(id: string) {
    this.store.dispatch(formActions.remove({ id }));
  }

  start() {
    this.store.dispatch(formActions.start());
  }

  submit(id: string) {
    this.store.dispatch(formActions.submit({ id }));
  }
}
