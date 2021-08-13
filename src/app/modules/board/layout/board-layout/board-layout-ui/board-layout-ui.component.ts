import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-board-layout-ui',
  templateUrl: './board-layout-ui.component.html',
  styleUrls: ['./board-layout-ui.component.sass']
})
export class BoardLayoutUiComponent {}
