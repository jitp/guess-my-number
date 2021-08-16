import { byTestId, createHostFactory, SpectatorHost } from "@ngneat/spectator";
import { BasePage, createPage } from "src/tests/helpers";
import { BoardHeaderUiComponent } from "./board-header-ui.component";

type CSpectator = SpectatorHost<BoardHeaderUiComponent>;

class Page extends BasePage<CSpectator> {
    readonly TEST_IDS = {
        AGAIN_BTN: "play-again-btn",
        BETWEEN_MSG: "between-msg",
        HEADER_TITLE: "header-title",
        GAME_SECRET: "game-secret",
    };

    get playAgainBtn(): HTMLButtonElement | null {
        return this.queryTestId(this.TEST_IDS.AGAIN_BTN);
    }

    get betweenMsg(): HTMLSpanElement | null {
        return this.queryTestId(this.TEST_IDS.BETWEEN_MSG);
    }

    get headerTitle(): HTMLHeadingElement | null {
        return this.queryTestId(this.TEST_IDS.HEADER_TITLE);
    }

    get gameSecret(): HTMLDivElement | null {
        return this.queryTestId(this.TEST_IDS.GAME_SECRET);
    }

    clickAgainBtn(): this {
        this.spectator.click(byTestId(this.TEST_IDS.AGAIN_BTN));

        return this;
    }
}

describe("BoardHeaderUiComponent", () => {
    let spectator: CSpectator;
    let page: Page;

    const createHost = createHostFactory({
        component: BoardHeaderUiComponent,
    });

    it("creates the component", () => {
        spectator = createHost(`<app-board-header-ui></app-board-header-ui>`);
        expect(spectator.component).toBeTruthy();
    });

    it("renders secret with question mark", () => {
        spectator = createHost(`<app-board-header-ui></app-board-header-ui>`);
        page = createPage(spectator, Page);

        expect(page.gameSecret).toHaveText("?");
    });

    it("renders secret number", () => {
        spectator = createHost(
            `<app-board-header-ui [secret]="secret"></app-board-header-ui>`,
            {
                hostProps: {
                    secret: 4,
                },
            }
        );
        page = createPage(spectator, Page);

        expect(page.gameSecret).toHaveText("4");
    });

    it("renders the 'between message'", () => {
        spectator = createHost(`<app-board-header-ui></app-board-header-ui>`);
        page = createPage(spectator, Page);

        expect(page.betweenMsg).toHaveText("(Between 1 and 20)");
    });

    it("renders the 'header title'", () => {
        spectator = createHost(`<app-board-header-ui></app-board-header-ui>`);
        page = createPage(spectator, Page);

        expect(page.headerTitle).toHaveText("Guess My Number!");
    });

    it("emits again event when clicking on again btn", () => {
        spectator = createHost(
            `<app-board-header-ui (again)="handleAgain()"></app-board-header-ui>`,
            {
                hostProps: {
                    handleAgain: jasmine
                        .createSpy("handleAgain")
                        .and.callThrough(),
                },
            }
        );
        page = createPage(spectator, Page);

        page.clickAgainBtn();

        expect((spectator.hostComponent as any).handleAgain).toHaveBeenCalled();
    });
});
