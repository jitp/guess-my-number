import { MessageEnum } from "../enums";

export interface BoardState {
    secret: number;
    score: number;
    highScore: number;
    message: MessageEnum | "";
    inputValue: number | null;
}

export interface AppState {
    board: BoardState;
}

export const initialState: BoardState = {
    secret: -1,
    score: -1,
    highScore: -1,
    message: "",
    inputValue: null,
};
