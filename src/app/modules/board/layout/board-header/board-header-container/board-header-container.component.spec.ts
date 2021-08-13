import { BoardSandbox } from '@app/modules/board/services';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { MockComponents } from 'ng-mocks';
import { BasePage, createPage } from 'src/tests/helpers';
import { BoardHeaderUiComponent } from '../board-header-ui/board-header-ui.component';
import { BoardHeaderContainerComponent } from './board-header-container.component';

type CSpectator = Spectator<BoardHeaderContainerComponent>;

class Page extends BasePage<CSpectator> {
  get uiCmp(): BoardHeaderUiComponent | null {
    return this.queryComponent(BoardHeaderUiComponent);
  }

  clickAgain(): this {
    this.uiCmp?.again.emit();

    this.spectator.detectChanges();

    return this;
  }
}

describe('BoardHeaderContainerComponent', () => {
  let spectator: CSpectator;
  let page: Page;

  const createComponent = createComponentFactory({
    component: BoardHeaderContainerComponent,
    mocks: [BoardSandbox],
    declarations: [MockComponents(BoardHeaderUiComponent)],
  });

  it('creates the component', () => {
    expect(createComponent().component).toBeTruthy();
  });

  it('passes the secret value', () => {
    spectator = createComponent({
      providers: [
        mockProvider(BoardSandbox, { secretDisplay$: cold('x|', { x: 2 }) }),
      ],
    });
    page = createPage(spectator, Page);

    getTestScheduler().flush();

    spectator.detectChanges();

    expect(page.uiCmp?.secret).toBe(2);
  });

  it('starts over', () => {
    spectator = createComponent();
    page = createPage(spectator, Page);

    page.clickAgain();

    expect(spectator.inject(BoardSandbox).startOver).toHaveBeenCalled();
  });
});
