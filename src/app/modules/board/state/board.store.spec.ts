import {
  createServiceFactory,
  mockProvider,
  SpectatorService,
  SpyObject,
} from '@ngneat/spectator';
import { BoardStore } from './board.store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState, BoardState, initialState } from './board-state';
import { cold } from 'jasmine-marbles';
import { BoardService } from '../services';
import { StateFeatureEnum } from '@app/core/enums';
import { MessageEnum } from '../enums';
import * as BoardActions from './board-actions';

function createState(state?: Partial<BoardState>): AppState {
  return { [StateFeatureEnum.BOARD]: { ...initialState, ...state } };
}

describe('BoardStore', () => {
  let spectator: SpectatorService<BoardStore>;

  const createService = createServiceFactory({
    service: BoardStore,
    providers: [
      provideMockStore({
        initialState: createState(),
      }),
      mockProvider(BoardService),
    ],
  });

  it('emits the high score', () => {
    spectator = createService();

    expect(spectator.service.highScore$).toBeObservable(cold('x', { x: -1 }));
  });

  it('emits the score', () => {
    spectator = createService();

    expect(spectator.service.score$).toBeObservable(cold('x', { x: -1 }));
  });

  it('emits the message', () => {
    spectator = createService();

    expect(spectator.service.message$).toBeObservable(cold('x', { x: '' }));
  });

  it('emits the inputValue', () => {
    spectator = createService();

    expect(spectator.service.inputValue$).toBeObservable(
      cold('x', { x: null })
    );
  });

  it('emits the secret', () => {
    spectator = createService();

    expect(spectator.service.secret$).toBeObservable(cold('x', { x: -1 }));
  });

  it('emits isGameOver', () => {
    spectator = createService();

    spectator.inject(BoardService).isGameOver.andReturn(false);

    expect(spectator.service.isGameOver$).toBeObservable(
      cold('x', { x: false })
    );

    spectator.inject(BoardService).isGameOver.andReturn(true);

    expect(spectator.service.isGameOver$).toBeObservable(
      cold('x', { x: true })
    );
  });

  it('emits hasEmptyInput', () => {
    spectator = createService();

    spectator.inject(BoardService).isEmptyInput.andReturn(true);

    expect(spectator.service.hasEmptyInput$).toBeObservable(
      cold('x', { x: true })
    );

    spectator.inject(BoardService).isEmptyInput.andReturn(false);

    expect(spectator.service.hasEmptyInput$).toBeObservable(
      cold('x', { x: false })
    );
  });

  it('emits hasCorrectMessage', () => {
    spectator = createService();
    const store = spectator.inject(MockStore);

    expect(spectator.service.hasCorrectMessage$).toBeObservable(
      cold('x', { x: false })
    );

    store.setState(createState({ message: MessageEnum.CORRECT_GUESS }));

    expect(spectator.service.hasCorrectMessage$).toBeObservable(
      cold('x', { x: true })
    );
  });

  it('emits hasOutOfRangeMessage', () => {
    spectator = createService();
    const store = spectator.inject(MockStore);

    expect(spectator.service.hasOutOfRangeMessage$).toBeObservable(
      cold('x', { x: false })
    );

    store.setState(createState({ message: MessageEnum.OUT_OF_RANGE }));

    expect(spectator.service.hasOutOfRangeMessage$).toBeObservable(
      cold('x', { x: true })
    );
  });

  describe('secretDisplay$', () => {
    let bService: SpyObject<BoardService>;
    let store: MockStore<AppState>;

    it('emits secretDisplay number when game is over', () => {
      spectator = createService();
      bService = spectator.inject(BoardService);
      store = spectator.inject(MockStore);

      bService.isGameOver.andReturn(true);
      store.setState(createState({ message: MessageEnum.INITIAL }));

      expect(spectator.service.secretDisplay$).toBeObservable(
        cold('x', { x: -1 })
      );
    });

    it('emits secretDisplay number when correct message', () => {
      spectator = createService();
      bService = spectator.inject(BoardService);
      store = spectator.inject(MockStore);

      bService.isGameOver.andReturn(false);
      store.setState(createState({ message: MessageEnum.CORRECT_GUESS }));

      expect(spectator.service.secretDisplay$).toBeObservable(
        cold('x', { x: -1 })
      );
    });

    it('emits secretDisplay "?" when game is not over and have not guess the secret', () => {
      spectator = createService();
      bService = spectator.inject(BoardService);
      store = spectator.inject(MockStore);

      bService.isGameOver.andReturn(false);
      store.setState(createState({ message: MessageEnum.INITIAL }));

      expect(spectator.service.secretDisplay$).toBeObservable(
        cold('x', { x: '?' })
      );
    });
  });

  describe('checkBtnDisabled$', () => {
    let bService: SpyObject<BoardService>;
    let store: MockStore<AppState>;

    it("emits checkBtnDisabled$ 'true' when it has empty input", () => {
      spectator = createService();
      bService = spectator.inject(BoardService);
      store = spectator.inject(MockStore);

      bService.isEmptyInput.andReturn(true);
      bService.isGameOver.andReturn(false);

      expect(spectator.service.checkBtnDisabled$).toBeObservable(
        cold('x', { x: true })
      );
    });

    it("emits checkBtnDisabled$ 'true' when it has correct message", () => {
      spectator = createService();
      bService = spectator.inject(BoardService);
      store = spectator.inject(MockStore);

      bService.isEmptyInput.andReturn(false);
      bService.isGameOver.andReturn(false);
      store.setState(createState({ message: MessageEnum.CORRECT_GUESS }));

      expect(spectator.service.checkBtnDisabled$).toBeObservable(
        cold('x', { x: true })
      );
    });

    it("emits checkBtnDisabled$ 'true' when it has out of range message", () => {
      spectator = createService();
      bService = spectator.inject(BoardService);
      store = spectator.inject(MockStore);

      bService.isEmptyInput.andReturn(false);
      bService.isGameOver.andReturn(false);
      store.setState(createState({ message: MessageEnum.OUT_OF_RANGE }));

      expect(spectator.service.checkBtnDisabled$).toBeObservable(
        cold('x', { x: true })
      );
    });

    it("emits checkBtnDisabled$ 'true' when game is over", () => {
      spectator = createService();
      bService = spectator.inject(BoardService);
      store = spectator.inject(MockStore);

      bService.isEmptyInput.andReturn(false);
      bService.isGameOver.andReturn(true);
      store.setState(createState({ message: MessageEnum.INITIAL }));

      expect(spectator.service.checkBtnDisabled$).toBeObservable(
        cold('x', { x: true })
      );
    });

    it("emits checkBtnDisabled$ 'false' when none of the above conditions are met", () => {
      spectator = createService();
      bService = spectator.inject(BoardService);
      store = spectator.inject(MockStore);

      bService.isEmptyInput.andReturn(false);
      bService.isGameOver.andReturn(false);
      store.setState(createState({ message: MessageEnum.INITIAL }));

      expect(spectator.service.checkBtnDisabled$).toBeObservable(
        cold('x', { x: false })
      );
    });
  });

  it('inits the board state', () => {
    spectator = createService();
    let store = spectator.inject(MockStore);
    const initialState = createState({
      message: MessageEnum.INITIAL,
      score: 0,
      highScore: 0,
      secret: 12,
    })[StateFeatureEnum.BOARD];

    spyOn(store, 'dispatch').and.callThrough();

    spectator.service.init(initialState);

    expect(store.dispatch).toHaveBeenCalledOnceWith(
      BoardActions.init({ initialState })
    );
  });

  it('starts over with new state', () => {
    spectator = createService();
    let store = spectator.inject(MockStore);
    const initialState = createState({
      message: MessageEnum.INITIAL,
      score: 0,
      highScore: 0,
      secret: 12,
    })[StateFeatureEnum.BOARD];

    spyOn(store, 'dispatch').and.callThrough();

    spectator.service.startOver(initialState);

    expect(store.dispatch).toHaveBeenCalledOnceWith(
      BoardActions.startOver({ startOverState: initialState })
    );
  });

  it('checks the answer', () => {
    spectator = createService();
    let store = spectator.inject(MockStore);
    const answer = 4;

    spyOn(store, 'dispatch').and.callThrough();

    spectator.service.checkAnswer(answer);

    expect(store.dispatch).toHaveBeenCalledOnceWith(
      BoardActions.checkAnswer({ inputValue: answer })
    );
  });

  it('changes user input value', () => {
    spectator = createService();
    let store = spectator.inject(MockStore);
    const inputValue = 4;

    spyOn(store, 'dispatch').and.callThrough();

    spectator.service.changeUserInputValue(inputValue);

    expect(store.dispatch).toHaveBeenCalledOnceWith(
      BoardActions.userChangeInput({ inputValue })
    );
  });
});
