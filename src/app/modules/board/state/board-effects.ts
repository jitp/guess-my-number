import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import * as BoardActions from './board-actions';
import { map } from 'rxjs/operators';
import { BoardService } from '../services/board.service';
import { BoardStore } from './board.store';

@Injectable()
export class BoardEffects {
  checkAnswer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.checkAnswer),
      concatLatestFrom(() => this.store.secret$),
      map(([action, secret]) => {
        const inputValue = action.inputValue;

        if (this.bs.isCorrectAnswer(inputValue, secret)) {
          return BoardActions.correctGuessing();
        }

        return BoardActions.incorrectGuessing({ inputValue });
      })
    )
  );

  updateHighScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.correctGuessing),
      concatLatestFrom(() => [this.store.highScore$, this.store.score$]),
      map(([, highScore, score]) => {
        return BoardActions.highScore({
          highScore: this.bs.resolveHighScore(highScore, score),
        });
      })
    )
  );

  showClueMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.incorrectGuessing),
      concatLatestFrom(() => this.store.secret$),
      map(([action, secret]) => {
        if (this.bs.isHighGuessing(action.inputValue, secret)) {
          return BoardActions.highGuessing();
        }

        return BoardActions.lowGuessing();
      })
    )
  );

  updateScore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.incorrectGuessing),
      concatLatestFrom(() => this.store.score$),
      map(([, score]) => {
        return BoardActions.score({ score: score - 1 });
      })
    )
  );

  gameOver$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.score),
      map((action) => {
        if (this.bs.isGameOver(action.score)) {
          return BoardActions.gameOver();
        }

        return BoardActions.NOOP();
      })
    )
  );

  showEmptyMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.userChangeInput),
      map((action) => {
        if (this.bs.isEmptyInput(action.inputValue)) {
          return BoardActions.emptyInput();
        }

        return BoardActions.NOOP();
      })
    )
  );

  showInputInRangeMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.userChangeInput),
      map((action) => {
        if (action.inputValue && !this.bs.isOutOfRange(action.inputValue)) {
          return BoardActions.inputInRange();
        }

        return BoardActions.NOOP();
      })
    )
  );

  showInputOutOfRangeMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.userChangeInput),
      map((action) => {
        if (action.inputValue && this.bs.isOutOfRange(action.inputValue)) {
          return BoardActions.inputOutOfRange();
        }

        return BoardActions.NOOP();
      })
    )
  );

  constructor(
    protected actions$: Actions,
    protected store: BoardStore,
    protected readonly bs: BoardService
  ) {}
}
