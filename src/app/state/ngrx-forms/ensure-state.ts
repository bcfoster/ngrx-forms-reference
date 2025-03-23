export function ensureState<TState>(state: TState | undefined): TState {
  if (!state) {
    throw new Error('state must not be undefined!');
  }

  return state;
}
