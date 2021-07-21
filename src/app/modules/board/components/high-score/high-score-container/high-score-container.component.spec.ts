import { BoardSandbox } from '@app/modules/board/services';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import { HighScoreUiComponent } from '../high-score-ui/high-score-ui.component';
import { HighScoreContainerComponent } from './high-score-container.component';
import { cold, getTestScheduler } from 'jasmine-marbles';

describe('HighScoreContainerComponent', () => {
  let spectator: Spectator<HighScoreContainerComponent>;

  const createComponent = createComponentFactory({
    component: HighScoreContainerComponent,
    shallow: true,
    declarations: [MockComponent(HighScoreUiComponent)],
    providers: [mockProvider(BoardSandbox)],
    detectChanges: false,
  });

  it('creates the component', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });

  it('renders the high score', () => {
    spectator = createComponent({
      detectChanges: false,
      providers: [
        mockProvider(BoardSandbox, {
          highScore$: cold('--a---b-', { a: 2, b: 18 }),
        }),
      ],
    });
    const highScoreUI = spectator.query(HighScoreUiComponent);

    expect(highScoreUI).toExist();

    spectator.detectChanges();

    getTestScheduler().flush();

    spectator.detectChanges();

    expect(highScoreUI?.highScore).toBe(18);
  });
});
