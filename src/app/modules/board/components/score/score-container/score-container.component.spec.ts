import { BoardSandbox } from '@app/modules/board/services';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { MockComponents } from 'ng-mocks';
import { ScoreUiComponent } from '../score-ui/score-ui.component';
import { ScoreContainerComponent } from './score-container.component';

describe('ScoreContainerComponent', () => {
  let spectator: Spectator<ScoreContainerComponent>;

  const createComponent = createComponentFactory({
    component: ScoreContainerComponent,
    mocks: [BoardSandbox],
    declarations: [MockComponents(ScoreUiComponent)],
  });

  it('creates the component', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });

  it('renders the score', () => {
    spectator = createComponent({
      providers: [mockProvider(BoardSandbox, { score$: cold('x|', { x: 15 }) })],
    });

    const scoreUI = spectator.query(ScoreUiComponent);

    expect(scoreUI).toBeTruthy();

    getTestScheduler().flush();

    spectator.detectChanges();

    expect(scoreUI?.score).toBe(15);
  });
});
