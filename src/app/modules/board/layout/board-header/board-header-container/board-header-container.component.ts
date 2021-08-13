import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardSandbox } from '@app/modules/board/services/board.sandbox';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-board-header-container',
  templateUrl: './board-header-container.component.html',
  styleUrls: ['./board-header-container.component.sass'],
})
export class BoardHeaderContainerComponent {
  secret$ = this.bs.secretDisplay$;

  constructor(protected readonly bs: BoardSandbox) {}

  startOver(): void {
    this.bs.startOver();
  }
}
