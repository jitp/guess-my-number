import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-input-ui',
  templateUrl: './input-ui.component.html',
  styleUrls: ['./input-ui.component.sass'],
})
export class InputUiComponent {
  @Input()
  value: number | null = null;

  @Input()
  min: number = 0;

  @Input()
  max: number = 20;

  @Input()
  disabled: boolean = false;

  @Output()
  valueChange = new EventEmitter<number | null>();

  @Output()
  check = new EventEmitter<number | null>();
}
