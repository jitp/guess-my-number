import { provideMockActions } from "@ngrx/effects/testing";
import { Observable } from "rxjs";
import { BoardService } from "../services";
import { BoardEffects } from "./board-effects";
import { BoardStore } from "./board.store";
import * as BoardActions from "./board-actions";
import { cold, hot } from "jasmine-marbles";
import { TestBed } from "@angular/core/testing";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { AppState, BoardState, initialState } from "./board-state";
import { StateFeatureEnum } from "@app/core/enums";

function createState(state?: Partial<BoardState>): AppState {
    return { [StateFeatureEnum.BOARD]: { ...initialState, ...state } };
}

describe("BoardEffects", () => {
    let effects: BoardEffects;
    let boardService: BoardService;
    let boardStore: BoardStore;
    let mockStore: MockStore<AppState>;
    let actions: Observable<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BoardEffects,
                BoardService,
                BoardStore,
                provideMockActions(() => actions),
                provideMockStore({
                    initialState: {
                        [StateFeatureEnum.BOARD]: { ...initialState },
                    },
                }),
            ],
        });
    });

    beforeEach(() => {
        effects = TestBed.inject(BoardEffects);
        boardService = TestBed.inject(BoardService);
        boardStore = TestBed.inject(BoardStore);
        mockStore = TestBed.inject(MockStore);
    });

    it("checks the answer and if correct emits correct guess action", () => {
        const inputValue = 5;
        const secret = 5;

        mockStore.setState(createState({ secret }));
        spyOn(boardService, "isCorrectAnswer").and.returnValue(true);

        actions = hot("x", { x: BoardActions.checkAnswer({ inputValue }) });
        const expected = cold("x", { x: BoardActions.correctGuessing() });

        expect(effects.checkAnswer$).toBeObservable(expected);
        expect(boardService.isCorrectAnswer).toHaveBeenCalledOnceWith(
            inputValue,
            secret
        );
    });

    it("checks the answer and if incorrect emits incorrect guess action", () => {
        const inputValue = 5;
        const secret = 6;

        mockStore.setState(createState({ secret }));
        spyOn(boardService, "isCorrectAnswer").and.returnValue(false);

        actions = hot("x", { x: BoardActions.checkAnswer({ inputValue }) });
        const expected = cold("x", {
            x: BoardActions.incorrectGuessing({ inputValue }),
        });

        expect(effects.checkAnswer$).toBeObservable(expected);
        expect(boardService.isCorrectAnswer).toHaveBeenCalledOnceWith(
            inputValue,
            secret
        );
    });

    it("resolves high score and emits high score action", () => {
        const highScore = 5;
        const score = 8;

        mockStore.setState(createState({ highScore, score }));
        spyOn(boardService, "resolveHighScore").and.returnValue(score);

        actions = hot("x", { x: BoardActions.correctGuessing() });
        const expected = cold("x", {
            x: BoardActions.highScore({ highScore: score }),
        });

        expect(effects.updateHighScore$).toBeObservable(expected);
        expect(boardService.resolveHighScore).toHaveBeenCalledOnceWith(
            highScore,
            score
        );
    });

    it("emits high guessing action when user input is higher than secret", () => {
        const secret = 5;
        const inputValue = 10;

        mockStore.setState(createState({ secret }));
        spyOn(boardService, "isHighGuessing").and.returnValue(true);

        actions = hot("x", {
            x: BoardActions.incorrectGuessing({ inputValue }),
        });
        const expected = cold("x", {
            x: BoardActions.highGuessing(),
        });

        expect(effects.showClueMessage$).toBeObservable(expected);
        expect(boardService.isHighGuessing).toHaveBeenCalledOnceWith(
            inputValue,
            secret
        );
    });

    it("emits low guessing action when user input is lower than secret", () => {
        const secret = 5;
        const inputValue = 1;

        mockStore.setState(createState({ secret }));
        spyOn(boardService, "isHighGuessing").and.returnValue(false);

        actions = hot("x", {
            x: BoardActions.incorrectGuessing({ inputValue }),
        });
        const expected = cold("x", {
            x: BoardActions.lowGuessing(),
        });

        expect(effects.showClueMessage$).toBeObservable(expected);
        expect(boardService.isHighGuessing).toHaveBeenCalledOnceWith(
            inputValue,
            secret
        );
    });

    it("decreases the score when incorrect guess happens emitting a score action", () => {
        const score = 4;

        mockStore.setState(createState({ score }));

        actions = hot("x", {
            x: BoardActions.incorrectGuessing({ inputValue: 2 }),
        });
        const expected = cold("x", {
            x: BoardActions.score({ score: score - 1 }),
        });

        expect(effects.updateScore$).toBeObservable(expected);
    });

    it("checks game score and emits game over action when score is lower than equal 0", () => {
        let score = 0;

        spyOn(boardService, "isGameOver").and.returnValue(true);

        actions = hot("x", {
            x: BoardActions.score({ score }),
        });
        let expected = cold("x", {
            x: BoardActions.gameOver(),
        });

        expect(effects.gameOver$).toBeObservable(expected);
        expect(boardService.isGameOver).toHaveBeenCalledWith(score);

        score = -1;

        actions = hot("x", {
            x: BoardActions.score({ score }),
        });
        expected = cold("x", {
            x: BoardActions.gameOver(),
        });

        expect(effects.gameOver$).toBeObservable(expected);
        expect(boardService.isGameOver).toHaveBeenCalledWith(score);
    });

    it("checks game score and emits noop action when score is greater than 0", () => {
        let score = 1;

        spyOn(boardService, "isGameOver").and.returnValue(false);

        actions = hot("x", {
            x: BoardActions.score({ score }),
        });
        let expected = cold("x", {
            x: BoardActions.NOOP(),
        });

        expect(effects.gameOver$).toBeObservable(expected);
        expect(boardService.isGameOver).toHaveBeenCalledOnceWith(score);
    });

    it("emits empty input action when user inputs no value", () => {
        const inputValue = null;

        spyOn(boardService, "isEmptyInput").and.returnValue(true);

        actions = hot("x", {
            x: BoardActions.userChangeInput({ inputValue }),
        });
        let expected = cold("x", {
            x: BoardActions.emptyInput(),
        });

        expect(effects.showEmptyMessage$).toBeObservable(expected);
        expect(boardService.isEmptyInput).toHaveBeenCalledOnceWith(inputValue);
    });

    it("emits noop action when user inputs a value", () => {
        const inputValue = 1;

        spyOn(boardService, "isEmptyInput").and.returnValue(false);

        actions = hot("x", {
            x: BoardActions.userChangeInput({ inputValue }),
        });
        let expected = cold("x", {
            x: BoardActions.NOOP(),
        });

        expect(effects.showEmptyMessage$).toBeObservable(expected);
        expect(boardService.isEmptyInput).toHaveBeenCalledOnceWith(inputValue);
    });

    it("emits input in range action when user input is not out of range", () => {
        const inputValue = 5;

        spyOn(boardService, "isOutOfRange").and.returnValue(false);

        actions = hot("x", {
            x: BoardActions.userChangeInput({ inputValue }),
        });
        let expected = cold("x", {
            x: BoardActions.inputInRange(),
        });

        expect(effects.showInputInRangeMessage$).toBeObservable(expected);
        expect(boardService.isOutOfRange).toHaveBeenCalledOnceWith(inputValue);
    });

    it("emits noop action when user input is out of range", () => {
        let inputValue = 22;

        spyOn(boardService, "isOutOfRange").and.returnValue(true);

        actions = hot("x", {
            x: BoardActions.userChangeInput({ inputValue }),
        });
        let expected = cold("x", {
            x: BoardActions.NOOP(),
        });

        expect(effects.showInputInRangeMessage$).toBeObservable(expected);
        expect(boardService.isOutOfRange).toHaveBeenCalledWith(inputValue);
    });

    it("emits noop action when user input is empty", () => {
        let inputValue = null;

        actions = hot("x", {
            x: BoardActions.userChangeInput({ inputValue }),
        });
        let expected = cold("x", {
            x: BoardActions.NOOP(),
        });

        expect(effects.showInputInRangeMessage$).toBeObservable(expected);
    });

    it("emits input out of range action when user input is out of range", () => {
        const inputValue = 22;

        spyOn(boardService, "isOutOfRange").and.returnValue(true);

        actions = hot("x", {
            x: BoardActions.userChangeInput({ inputValue }),
        });
        let expected = cold("x", {
            x: BoardActions.inputOutOfRange(),
        });

        expect(effects.showInputOutOfRangeMessage$).toBeObservable(expected);
        expect(boardService.isOutOfRange).toHaveBeenCalledOnceWith(inputValue);
    });

    it("emits noop action when user input is in range", () => {
        let inputValue = 5;

        spyOn(boardService, "isOutOfRange").and.returnValue(false);

        actions = hot("x", {
            x: BoardActions.userChangeInput({ inputValue }),
        });
        let expected = cold("x", {
            x: BoardActions.NOOP(),
        });

        expect(effects.showInputOutOfRangeMessage$).toBeObservable(expected);
        expect(boardService.isOutOfRange).toHaveBeenCalledWith(inputValue);
    });

    it("emits noop action when user input is empty", () => {
        let inputValue = null;

        actions = hot("x", {
            x: BoardActions.userChangeInput({ inputValue }),
        });
        let expected = cold("x", {
            x: BoardActions.NOOP(),
        });

        expect(effects.showInputOutOfRangeMessage$).toBeObservable(expected);
    });
});
