import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BoardSandbox } from '@app/modules/board/services';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-board-layout-container',
  templateUrl: './board-layout-container.component.html',
  styleUrls: ['./board-layout-container.component.sass'],
})
export class BoardLayoutContainerComponent implements OnInit {
  constructor(protected bs: BoardSandbox) {}

  ngOnInit(): void {
    this.bs.init();
  }
}
