import { AppComponent } from './app.component';
import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator';
import { Location } from '@angular/common';

describe('AppComponent', () => {
  let spectator: SpectatorRouting<AppComponent>;

  const createComponent = createRoutingFactory({
    component: AppComponent,
    stubsEnabled: false,
    routes: [{ path: '**', redirectTo: '', pathMatch: 'full' }],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('creates the app', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('redirects to empty location when no system url is given', async () => {
    await spectator.fixture.whenStable();

    expect(spectator.inject(Location).path()).toBe('/');

    spectator.router.navigate(['/whatever']);

    await spectator.fixture.whenStable();

    expect(spectator.inject(Location).path()).toBe('/');
  });
});
