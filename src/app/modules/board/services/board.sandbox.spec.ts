import {
    createServiceFactory,
    mockProvider,
    SpectatorService,
} from "@ngneat/spectator";
import { cold } from "jasmine-marbles";
import { MessageEnum } from "../enums";
import { BoardStore } from "../state";
import { BoardSandbox } from "./board.sandbox";
import { BoardService } from "./board.service";

describe("BoardSandbox", () => {
    let spectator: SpectatorService<BoardSandbox>;
    const createService = createServiceFactory({
        service: BoardSandbox,
        mocks: [BoardStore, BoardService],
    });

    it("inits", () => {
        spectator = createService();

        spectator.service.init();

        expect(spectator.inject(BoardStore).init).toHaveBeenCalledTimes(1);
    });

    it("starts over", () => {
        spectator = createService();

        spectator.service.startOver();

        expect(spectator.inject(BoardStore).startOver).toHaveBeenCalledTimes(1);
    });

    it("checks the answer", () => {
        spectator = createService();

        spectator.service.checkAnswer(5);

        expect(
            spectator.inject(BoardStore).checkAnswer
        ).toHaveBeenCalledOnceWith(5);
    });

    it("notifies user change input value", () => {
        spectator = createService();

        spectator.service.notifyUserChangeInputValue(5);

        expect(
            spectator.inject(BoardStore).changeUserInputValue
        ).toHaveBeenCalledOnceWith(5);
    });

    it("exposes public state", () => {
        spectator = createService({
            providers: [
                mockProvider(BoardStore, {
                    secretDisplay$: cold("x", { x: 2 }),
                    highScore$: cold("x", { x: 0 }),
                    score$: cold("x", { x: 0 }),
                    message$: cold("x", { x: MessageEnum.INITIAL }),
                    inputValue$: cold("x", { x: null }),
                    checkBtnDisabled$: cold("x", { x: true }),
                }),
            ],
        });

        expect(spectator.service.secretDisplay$).toBeObservable(
            cold("x", { x: 2 })
        );
        expect(spectator.service.highScore$).toBeObservable(
            cold("x", { x: 0 })
        );
        expect(spectator.service.score$).toBeObservable(cold("x", { x: 0 }));
        expect(spectator.service.message$).toBeObservable(
            cold("x", { x: MessageEnum.INITIAL })
        );
        expect(spectator.service.inputValue$).toBeObservable(
            cold("x", { x: null })
        );
        expect(spectator.service.checkBtnDisabled$).toBeObservable(
            cold("x", { x: true })
        );
    });
});
