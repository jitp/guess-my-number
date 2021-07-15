import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardSandbox } from '@app/modules/board/services/board.sandbox';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-high-score-container',
  templateUrl: './high-score-container.component.html',
  styleUrls: ['./high-score-container.component.sass'],
})
export class HighScoreContainerComponent {
  highScore$ = this.bs.highScore$;

  constructor(protected readonly bs: BoardSandbox) {}
}
