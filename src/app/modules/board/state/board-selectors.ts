import { StateFeatureEnum } from '@app/core/enums';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MessageEnum } from '../enums';
import { BoardState } from './board-state';

export const selectBoardState = createFeatureSelector<
  { [StateFeatureEnum.BOARD]: BoardState },
  BoardState
>(StateFeatureEnum.BOARD);

export const selectSecret = createSelector(
  selectBoardState,
  (state: BoardState) => state.secret
);

export const selectInputValue = createSelector(
  selectBoardState,
  (state: BoardState) => state.inputValue
);

export const selectMessage = createSelector(
  selectBoardState,
  (state: BoardState) => state.message
);

export const selectScore = createSelector(
  selectBoardState,
  (state: BoardState) => state.score
);

export const selectHighScore = createSelector(
  selectBoardState,
  (state: BoardState) => state.highScore
);

export const selectIsEmptyInput = createSelector(
  selectInputValue,
  (inputValue) => inputValue === null
);
