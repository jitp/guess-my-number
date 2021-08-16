import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-message-ui",
    templateUrl: "./message-ui.component.html",
    styleUrls: ["./message-ui.component.sass"],
})
export class MessageUiComponent {
    @Input()
    message: string = "";
}
