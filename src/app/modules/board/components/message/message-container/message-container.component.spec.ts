import { BoardSandbox } from '@app/modules/board/services';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { MockComponents } from 'ng-mocks';
import { MessageUiComponent } from '../message-ui/message-ui.component';
import { MessageContainerComponent } from './message-container.component';

describe('MessageContainerComponent', () => {
  let spectator: Spectator<MessageContainerComponent>;

  const createComponent = createComponentFactory({
    component: MessageContainerComponent,
    mocks: [BoardSandbox],
    declarations: [MockComponents(MessageUiComponent)],
  });

  it('creates the component', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });

  it('renders the message', () => {
    spectator = createComponent({
      providers: [
        mockProvider(BoardSandbox, {
          message$: cold('x|', { x: 'Test message' }),
        }),
      ],
    });

    const messageUI = spectator.query(MessageUiComponent);

    getTestScheduler().flush();

    spectator.detectChanges();
    
    expect(messageUI).toBeTruthy();
    expect(messageUI?.message).toBe('Test message');
  });
});
