import { Type } from '@angular/core';
import { byTestId, Spectator } from '@ngneat/spectator';

export abstract class BasePage<S extends Spectator<unknown>> {
  protected spectator;

  constructor(spectator: S) {
    this.spectator = spectator;
  }

  protected queryTestId<T extends Element>(testId: string): T | null {
    return this.spectator.query<T>(byTestId(testId));
  }

  protected queryComponent<C>(cmp: Type<C>): C | null {
    return this.spectator.query(cmp);
  }
}

export function createPage<T extends Spectator<unknown>, P extends BasePage<T>>(
  spectator: T,
  pageCtor: Type<P>
): P {
  return new pageCtor(spectator);
}
