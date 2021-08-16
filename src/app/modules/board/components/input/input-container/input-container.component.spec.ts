import { BoardSandbox } from "@app/modules/board/services";
import {
    createComponentFactory,
    mockProvider,
    Spectator,
} from "@ngneat/spectator";
import { cold, getTestScheduler } from "jasmine-marbles";
import { MockComponents } from "ng-mocks";
import { BasePage, createPage } from "src/tests/helpers";
import { InputUiComponent } from "../input-ui/input-ui.component";
import { InputContainerComponent } from "./input-container.component";

type CSpectator = Spectator<InputContainerComponent>;
class Page extends BasePage<CSpectator> {
    get uiCmp(): InputUiComponent | null {
        return this.queryComponent(InputUiComponent);
    }

    emitValueChange(value: number): this {
        this.uiCmp?.valueChange.emit(value);

        this.spectator.detectChanges();

        return this;
    }

    emitCheck(value: number | null): this {
        this.uiCmp?.check.emit(value);

        this.spectator.detectChanges();

        return this;
    }
}

describe("InputContainerComponent", () => {
    let spectator: CSpectator;
    let page: Page;

    const createComponent = createComponentFactory({
        component: InputContainerComponent,
        mocks: [BoardSandbox],
        declarations: [MockComponents(InputUiComponent)],
    });

    it("creates the component", () => {
        spectator = createComponent();
        expect(spectator.component).toBeTruthy();
    });

    it("passes the value to the ui component", () => {
        spectator = createComponent({
            providers: [
                mockProvider(BoardSandbox, {
                    inputValue$: cold("x|", { x: 12 }),
                }),
            ],
        });
        page = createPage(spectator, Page);

        getTestScheduler().flush();

        spectator.detectChanges();

        expect(page.uiCmp?.value).toBe(12);
    });

    it("passes disabled to the ui component", () => {
        spectator = createComponent({
            providers: [
                mockProvider(BoardSandbox, {
                    checkBtnDisabled$: cold("x|", { x: true }),
                }),
            ],
        });
        page = createPage(spectator, Page);

        getTestScheduler().flush();

        spectator.detectChanges();

        expect(page.uiCmp?.disabled).toBeTrue();
    });

    it("notifies input value change", () => {
        spectator = createComponent();
        page = createPage(spectator, Page);

        page.emitValueChange(15);

        expect(
            spectator.inject(BoardSandbox).notifyUserChangeInputValue
        ).toHaveBeenCalledOnceWith(15);
    });

    it("handles the check event", () => {
        spectator = createComponent();
        page = createPage(spectator, Page);

        page.emitCheck(20);

        expect(spectator.inject(BoardSandbox).checkAnswer).toHaveBeenCalledWith(
            20
        );

        page.emitCheck(null);

        expect(
            spectator.inject(BoardSandbox).checkAnswer
        ).not.toHaveBeenCalledWith(null);
    });
});
