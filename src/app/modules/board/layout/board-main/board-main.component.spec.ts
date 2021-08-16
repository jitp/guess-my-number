import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { MockComponents } from "ng-mocks";
import { BasePage, createPage } from "src/tests/helpers";
import {
    HighScoreContainerComponent,
    InputContainerComponent,
    MessageContainerComponent,
    ScoreContainerComponent,
} from "../../components";
import { BoardMainComponent } from "./board-main.component";

type CSpectator = Spectator<BoardMainComponent>;

class Page extends BasePage<CSpectator> {
    get inputCmp(): InputContainerComponent | null {
        return this.queryComponent(InputContainerComponent);
    }

    get msgCmp(): MessageContainerComponent | null {
        return this.queryComponent(MessageContainerComponent);
    }

    get scoreCmp(): ScoreContainerComponent | null {
        return this.queryComponent(ScoreContainerComponent);
    }

    get highScoreCmp(): HighScoreContainerComponent | null {
        return this.queryComponent(HighScoreContainerComponent);
    }
}

describe("BoardMainComponent", () => {
    let spectator: CSpectator;
    let page: Page;

    const createComponent = createComponentFactory({
        component: BoardMainComponent,
        declarations: [
            MockComponents(
                InputContainerComponent,
                MessageContainerComponent,
                ScoreContainerComponent,
                HighScoreContainerComponent
            ),
        ],
    });

    it("creates the component", () => {
        expect(createComponent().component).toBeTruthy();
    });

    it("renders the input container", () => {
        spectator = createComponent();
        page = createPage(spectator, Page);

        expect(page.inputCmp).toBeTruthy();
    });

    it("renders the message container", () => {
        spectator = createComponent();
        page = createPage(spectator, Page);

        expect(page.msgCmp).toBeTruthy();
    });

    it("renders the score container", () => {
        spectator = createComponent();
        page = createPage(spectator, Page);

        expect(page.scoreCmp).toBeTruthy();
    });

    it("renders the high score container", () => {
        spectator = createComponent();
        page = createPage(spectator, Page);

        expect(page.highScoreCmp).toBeTruthy();
    });
});
