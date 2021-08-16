import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { MockComponents } from "ng-mocks";
import { BasePage, createPage } from "src/tests/helpers";
import { BoardHeaderContainerComponent } from "../../board-header";
import { BoardMainComponent } from "../../board-main/board-main.component";
import { BoardLayoutUiComponent } from "./board-layout-ui.component";

type CSpectator = Spectator<BoardLayoutUiComponent>;

class Page extends BasePage<CSpectator> {
    get headerCmp(): BoardHeaderContainerComponent | null {
        return this.queryComponent(BoardHeaderContainerComponent);
    }

    get mainCmp(): BoardMainComponent | null {
        return this.queryComponent(BoardMainComponent);
    }
}

describe("BoardLayoutUiComponent", () => {
    let spectator: CSpectator;
    let page: Page;

    const createComponent = createComponentFactory({
        component: BoardLayoutUiComponent,
        declarations: [
            MockComponents(BoardHeaderContainerComponent, BoardMainComponent),
        ],
    });

    it("creates the component", () => {
        expect(createComponent().component).toBeTruthy();
    });

    it("renders the header component", () => {
        spectator = createComponent();
        page = createPage(spectator, Page);

        expect(page.headerCmp).toBeTruthy();
    });

    it("renders the main component", () => {
        spectator = createComponent();
        page = createPage(spectator, Page);

        expect(page.mainCmp).toBeTruthy();
    });
});
