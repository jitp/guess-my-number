import { NgModule } from '@angular/core';
import { BoardRoutingModule } from './board-routing.module';
import { SharedModule } from '@app/shared';
import {
  BoardLayoutContainerComponent,
  BoardLayoutUiComponent,
  BoardHeaderContainerComponent,
  BoardHeaderUiComponent,
  BoardMainComponent,
} from './layout';
import { StoreModule } from '@ngrx/store';
import { StateFeatureEnum } from '@app/core/enums';
import { BoardEffects, reducer as boardReducer, BoardStore } from './state';
import { EffectsModule } from '@ngrx/effects';
import {
  InputContainerComponent,
  InputUiComponent,
  MessageContainerComponent,
  MessageUiComponent,
  ScoreContainerComponent,
  ScoreUiComponent,
  HighScoreContainerComponent,
  HighScoreUiComponent,
} from './components';
import { BoardService, BoardSandbox } from './services';

@NgModule({
  declarations: [
    BoardLayoutUiComponent,
    BoardLayoutContainerComponent,
    BoardMainComponent,
    BoardHeaderContainerComponent,
    BoardHeaderUiComponent,
    InputContainerComponent,
    InputUiComponent,
    MessageContainerComponent,
    MessageUiComponent,
    ScoreUiComponent,
    ScoreContainerComponent,
    HighScoreContainerComponent,
    HighScoreUiComponent,
  ],
  imports: [
    StoreModule.forFeature(StateFeatureEnum.BOARD, boardReducer),
    EffectsModule.forFeature([BoardEffects]),
    SharedModule,
    BoardRoutingModule,
  ],
  providers: [BoardService, BoardStore, BoardSandbox],
})
export class BoardModule {}
