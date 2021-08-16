import { byTestId, createComponentFactory, Spectator } from "@ngneat/spectator";
import { ScoreUiComponent } from "./score-ui.component";

describe("ScoreUiComponent", () => {
    let spectator: Spectator<ScoreUiComponent>;

    const createComponent = createComponentFactory({
        component: ScoreUiComponent,
    });

    beforeEach(() => {
        spectator = createComponent({
            props: {
                score: 15,
            },
        });
    });

    it("creates the component", () => {
        expect(spectator.component).toBeTruthy();
    });

    it("renders the score", () => {
        expect(spectator.query(byTestId("score-value"))).toHaveText("15");
    });
});
