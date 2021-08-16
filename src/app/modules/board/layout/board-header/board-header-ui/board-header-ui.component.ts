import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from "@angular/core";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-board-header-ui",
    templateUrl: "./board-header-ui.component.html",
    styleUrls: ["./board-header-ui.component.sass"],
})
export class BoardHeaderUiComponent {
    @Input()
    secret: number | "?" = "?";

    @Output()
    again = new EventEmitter<void>();
}
