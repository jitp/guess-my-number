import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-board-main",
    templateUrl: "./board-main.component.html",
    styleUrls: ["./board-main.component.sass"],
})
export class BoardMainComponent {}
