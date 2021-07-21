import { byTestId, createComponentFactory, Spectator } from '@ngneat/spectator';
import { MessageUiComponent } from './message-ui.component';

describe('MessageUiComponent', () => {
  let spectator: Spectator<MessageUiComponent>;

  const createComponent = createComponentFactory({
    component: MessageUiComponent,
  });

  beforeEach(() => {
    spectator = createComponent({
      props: {
        message: 'Test message',
      },
    });
  });

  it('creates the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('renders the message', () => {
    expect(spectator.query(byTestId('message-value'))).toHaveText(
      'Test message'
    );
  });
});
