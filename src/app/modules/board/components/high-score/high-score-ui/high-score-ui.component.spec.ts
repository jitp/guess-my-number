import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { HighScoreUiComponent } from './high-score-ui.component';

describe('HighScoreUiComponent', () => {
  let spectator: Spectator<HighScoreUiComponent>;

  const createComponent = createComponentFactory({
    component: HighScoreUiComponent,
  });

  beforeEach(
    () =>
      (spectator = createComponent({
        props: {
          highScore: 20,
        },
      }))
  );

  it('creates the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('renders the high score', () => {
    expect(spectator.query(byTestId('high-score-value'))).toHaveText('20');
  });
});
