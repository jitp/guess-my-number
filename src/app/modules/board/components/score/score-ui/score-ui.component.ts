import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-score-ui',
  templateUrl: './score-ui.component.html',
  styleUrls: ['./score-ui.component.sass'],
})
export class ScoreUiComponent {
  @Input()
  score: number = 20;
}
