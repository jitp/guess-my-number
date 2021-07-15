import { Injectable } from '@angular/core';
import { BaseStore } from '@app/core/state/store.service';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { MessageEnum } from '../enums';
import { BoardService } from '../services/board.service';
import { checkAnswer, init, startOver, userChangeInput } from './board-actions';
import { BoardState } from './board-state';

@Injectable()
export class BoardStore extends BaseStore<BoardState> {
  readonly highScore$ = this.select((state: BoardState) => state.highScore, {
    featureKey: 'board',
  });

  readonly score$ = this.select((state: BoardState) => state.score, {
    featureKey: 'board',
  });

  readonly message$ = this.select((state: BoardState) => state.message, {
    featureKey: 'board',
  });

  readonly inputValue$ = this.select((state: BoardState) => state.inputValue, {
    featureKey: 'board',
  });

  readonly secret$ = this.select((state: BoardState) => state.secret, {
    featureKey: 'board',
  });

  readonly isGameOver$ = this.score$.pipe(map(this.bs.isGameOver));

  readonly hasEmptyInput$ = this.inputValue$.pipe(map(this.bs.isEmptyInput));

  readonly hasCorrectMessage$ = this.message$.pipe(
    map((message) => message === MessageEnum.CORRECT_GUESS)
  );

  readonly hasOutOfRangeMessage$ = this.message$.pipe(
    map((message) => message === MessageEnum.OUT_OF_RANGE)
  );

  readonly secretDisplay$ = this.select(
    this.secret$,
    this.isGameOver$,
    this.hasCorrectMessage$,
    (secret, isGameOver, hasCorrectMessage) => (isGameOver || hasCorrectMessage ? secret : '?')
  );

  readonly checkBtnDisabled$ = this.select(
    this.hasEmptyInput$,
    this.hasCorrectMessage$,
    this.hasOutOfRangeMessage$,
    this.isGameOver$,
    (hasEmptyInput, hasCorrectMessage, hasOutOfRangeMessage, isGameOver) =>
      hasEmptyInput || hasCorrectMessage || hasOutOfRangeMessage || isGameOver
  );

  constructor(store: Store<BoardState>, protected bs: BoardService) {
    super(store);
  }

  init(initialState: BoardState): void {
    this.dispatch(init({ initialState }));
  }

  startOver(startOverState: BoardState): void {
    this.dispatch(startOver({ startOverState }));
  }

  checkAnswer(inputValue: number): void {
    this.dispatch(checkAnswer({ inputValue }));
  }

  changeUserInputValue(inputValue: number | null): void {
    this.dispatch(userChangeInput({ inputValue }));
  }
}
