import { createAction, props } from "@ngrx/store";
import { BoardState } from "./board-state";

export const NOOP = createAction("[Board] No Op");

export const correctGuessing = createAction("[Board] Correct Guess");
export const incorrectGuessing = createAction(
    "[Board] Incorrect Guess",
    props<{ inputValue: number }>()
);
export const highGuessing = createAction("[Board] High Guess");
export const lowGuessing = createAction("[Board] Low Guess");
export const gameOver = createAction("[Board] Game Over");

export const inputOutOfRange = createAction("[Board] Input Out of Range");
export const inputInRange = createAction("[Board] Input In Range");
export const emptyInput = createAction("[Board] Empty Input");
export const userChangeInput = createAction(
    "[Board] User Change Input",
    props<{ inputValue: number | null }>()
);

export const score = createAction("[Board] Score", props<{ score: number }>());
export const highScore = createAction(
    "[Board] High Score",
    props<{ highScore: number }>()
);

// TODO: possible elimination
export const inputValue = createAction(
    "[Board] Input Value",
    props<{ inputValue: number | null }>()
);

// TODO: possible elimination
export const createSecret = createAction("[Board] Create Secret");

export const init = createAction(
    "[Board] Init",
    props<{ initialState: BoardState }>()
);
export const startOver = createAction(
    "[Board] Start Over",
    props<{ startOverState: BoardState }>()
);
export const checkAnswer = createAction(
    "[Board] Check answer",
    props<{ inputValue: number }>()
);
