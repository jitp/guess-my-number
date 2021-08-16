import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BoardSandbox } from "@app/modules/board/services/board.sandbox";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-score-container",
    templateUrl: "./score-container.component.html",
    styleUrls: ["./score-container.component.sass"],
})
export class ScoreContainerComponent {
    score$ = this.bs.score$;

    constructor(protected readonly bs: BoardSandbox) {}
}
