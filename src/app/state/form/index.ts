import { AbstractControlState, isGroupState } from 'ngrx-forms';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getControlCounts(state: AbstractControlState<any>): {
  mandatory: number;
  remaining: number;
} {
  if (!isGroupState(state)) {
    return {
      mandatory: state.userDefinedProperties['mandatory'] ? 1 : 0,
      remaining: state.isInvalid ? 1 : 0,
    };
  }

  const count = { remaining: 0, mandatory: 0 };

  Object.values(state.controls).forEach((c) => {
    const { mandatory, remaining } = getControlCounts(c);
    count.mandatory += mandatory;
    count.remaining += remaining;
  });

  return count;
}

export * as form from './form.feature';
