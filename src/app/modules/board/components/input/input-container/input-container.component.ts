import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BoardSandbox } from "@app/modules/board/services/board.sandbox";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-input-container",
    templateUrl: "./input-container.component.html",
    styleUrls: ["./input-container.component.sass"],
})
export class InputContainerComponent {
    value$ = this.bs.inputValue$;
    disabled$ = this.bs.checkBtnDisabled$;

    constructor(protected readonly bs: BoardSandbox) {}

    valueChange(value: number | null): void {
        this.bs.notifyUserChangeInputValue(value);
    }

    checkAnswer(inputValue: number | null): void {
        if (inputValue) this.bs.checkAnswer(inputValue);
    }
}
