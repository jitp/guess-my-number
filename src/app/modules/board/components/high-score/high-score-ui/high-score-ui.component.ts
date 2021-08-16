import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-high-score-ui",
    templateUrl: "./high-score-ui.component.html",
    styleUrls: ["./high-score-ui.component.sass"],
})
export class HighScoreUiComponent {
    @Input()
    highScore: number = 0;
}
