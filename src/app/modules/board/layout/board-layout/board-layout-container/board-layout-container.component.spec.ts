import { BoardSandbox } from "@app/modules/board/services";
import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { MockComponents } from "ng-mocks";
import { BasePage, createPage } from "src/tests/helpers";
import { BoardLayoutUiComponent } from "../board-layout-ui/board-layout-ui.component";
import { BoardLayoutContainerComponent } from "./board-layout-container.component";

type CSpectator = Spectator<BoardLayoutContainerComponent>;

class Page extends BasePage<CSpectator> {
    get uiCmp(): BoardLayoutUiComponent | null {
        return this.queryComponent(BoardLayoutUiComponent);
    }
}

describe("BoardLayoutContainerComponent", () => {
    let spectator: CSpectator;
    let page: Page;

    const createComponent = createComponentFactory({
        component: BoardLayoutContainerComponent,
        mocks: [BoardSandbox],
        declarations: [MockComponents(BoardLayoutUiComponent)],
    });

    it("creates the component", () => {
        expect(createComponent().component).toBeTruthy();
    });

    it("renders the ui component", () => {
        spectator = createComponent();
        page = createPage(spectator, Page);

        expect(page.uiCmp).toBeTruthy();
    });

    it("inits the state", () => {
        spectator = createComponent();

        expect(spectator.inject(BoardSandbox).init).toHaveBeenCalledTimes(1);
    });
});
