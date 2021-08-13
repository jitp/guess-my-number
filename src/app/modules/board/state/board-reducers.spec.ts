import { BoardState, initialState } from './board-state';
import * as BoardActions from './board-actions';
import * as BoardReducer from './board-reducers';
import { MessageEnum } from '../enums';
import { expectState } from 'src/tests/helpers';

describe('BoardReducer', () => {
  let state: BoardState;

  beforeEach(() => {
    state = initialState;
  });

  describe('Correct guessing action', () => {
    it('sets the correct guess message', () => {
      const newState = { ...state, message: MessageEnum.CORRECT_GUESS };

      const derivedState = BoardReducer.reducer(
        state,
        BoardActions.correctGuessing()
      );

      expectState(derivedState, newState);
    });
  });

  describe('High guessing action', () => {
    it('sets the high guessing message', () => {
      const newState = { ...state, message: MessageEnum.HIGH_VALUE };

      const derivedState = BoardReducer.reducer(
        state,
        BoardActions.highGuessing()
      );

      expectState(derivedState, newState);
    });
  });

  describe('Low guessing action', () => {
    it('sets the low guessing message', () => {
      const newState = { ...state, message: MessageEnum.LOW_VALUE };

      const derivedState = BoardReducer.reducer(
        state,
        BoardActions.lowGuessing()
      );

      expectState(derivedState, newState);
    });
  });

  describe('Input in range action', () => {
    it('sets the initial message', () => {
      const newState = { ...state, message: MessageEnum.INITIAL };

      const derivedState = BoardReducer.reducer(
        state,
        BoardActions.inputInRange()
      );

      expectState(derivedState, newState);
    });
  });

  describe('Input out of range action', () => {
    it('sets the out of range message', () => {
      const newState = { ...state, message: MessageEnum.OUT_OF_RANGE };

      const derivedState = BoardReducer.reducer(
        state,
        BoardActions.inputOutOfRange()
      );

      expectState(derivedState, newState);
    });
  });

  describe('Empty input action', () => {
    it('sets the empty input message', () => {
      const newState = { ...state, message: MessageEnum.EMPTY_INPUT };

      const derivedState = BoardReducer.reducer(
        state,
        BoardActions.emptyInput()
      );

      expectState(derivedState, newState);
    });
  });

  describe('Game over action', () => {
    it('sets the game over message', () => {
      const newState = { ...state, message: MessageEnum.GAME_OVER };

      const derivedState = BoardReducer.reducer(state, BoardActions.gameOver());

      expectState(derivedState, newState);
    });
  });

  describe('Score action', () => {
    it('sets the new score', () => {
      const newState = { ...state, score: 5 };

      const derivedState = BoardReducer.reducer(
        state,
        BoardActions.score({ score: 5 })
      );

      expectState(derivedState, newState);
    });
  });

  describe('High score action', () => {
    it('sets the new high score', () => {
      const newState = { ...state, highScore: 5 };

      const derivedState = BoardReducer.reducer(
        state,
        BoardActions.highScore({ highScore: 5 })
      );

      expectState(derivedState, newState);
    });
  });

  describe('Start over action', () => {
    it('sets initial state keeping previous high score', () => {
      const newState = { ...state, highScore: 8 };

      const derivedState = BoardReducer.reducer(
        { ...state, highScore: 8 },
        BoardActions.startOver({ startOverState: state })
      );

      expectState(derivedState, newState);
    });
  });

  describe('Init action', () => {
    it('sets initial state', () => {
      const newState = { ...state, highScore: 8 };

      const derivedState = BoardReducer.reducer(
        state,
        BoardActions.init({ initialState: newState })
      );

      expectState(derivedState, newState);
    });
  });

  describe('User change input action', () => {
    it('sets new input value', () => {
      const newState = { ...state, inputValue: 8 };

      const derivedState = BoardReducer.reducer(
        state,
        BoardActions.userChangeInput({ inputValue: 8 })
      );

      expectState(derivedState, newState);
    });
  });
});
