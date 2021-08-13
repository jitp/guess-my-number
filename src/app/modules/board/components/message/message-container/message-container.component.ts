import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardSandbox } from '@app/modules/board/services/board.sandbox';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.sass'],
})
export class MessageContainerComponent {
  message$ = this.bs.message$;

  constructor(protected readonly bs: BoardSandbox) {}
}
