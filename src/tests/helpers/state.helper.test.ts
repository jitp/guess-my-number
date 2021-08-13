export function expectState<S>(state: S, newState: S): void {
  expect(newState).toEqual(state);
  expect(newState).not.toBe(state);
}
