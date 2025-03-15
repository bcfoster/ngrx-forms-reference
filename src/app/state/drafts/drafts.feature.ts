import { isDevMode } from '@angular/core';
import { createFeature, MetaReducer } from '@ngrx/store';
import { reducer, State } from './drafts.reducer';

export const FEATURE_KEY = 'drafts';

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const feature = createFeature({ name: FEATURE_KEY, reducer });
