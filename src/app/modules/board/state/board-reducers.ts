import { Action, createReducer, on } from '@ngrx/store';
import { MessageEnum } from '../enums';
import * as BoardActions from './board-actions';
import { BoardState, initialState } from './board-state';

const boardReducer = createReducer(
  initialState,
  on(BoardActions.correctGuessing, (state) => ({
    ...state,
    message: MessageEnum.CORRECT_GUESS,
  })),
  on(BoardActions.highGuessing, (state) => ({
    ...state,
    message: MessageEnum.HIGH_VALUE,
  })),
  on(BoardActions.lowGuessing, (state) => ({
    ...state,
    message: MessageEnum.LOW_VALUE,
  })),
  on(BoardActions.inputInRange, (state) => ({
    ...state,
    message: MessageEnum.INITIAL,
  })),
  on(BoardActions.inputOutOfRange, (state) => ({
    ...state,
    message: MessageEnum.OUT_OF_RANGE,
  })),
  on(BoardActions.emptyInput, (state) => ({
    ...state,
    message: MessageEnum.EMPTY_INPUT,
  })),
  on(BoardActions.gameOver, (state) => ({
    ...state,
    message: MessageEnum.GAME_OVER,
  })),
  on(BoardActions.score, (state, { score }) => ({ ...state, score })),
  on(BoardActions.highScore, (state, { highScore }) => ({
    ...state,
    highScore,
  })),
  on(BoardActions.startOver, (state, { startOverState }) => ({
    ...startOverState,
    highScore: state.highScore,
  })),
  on(BoardActions.init, (state, { initialState: startingState }) => ({
    ...startingState,
  })),
  on(BoardActions.userChangeInput, (state, { inputValue }) => ({
    ...state,
    inputValue,
  }))
);

export function reducer(state: BoardState | undefined, action: Action) {
  return boardReducer(state, action);
}
