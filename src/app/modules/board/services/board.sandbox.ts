import { Injectable } from '@angular/core';
import { MessageEnum } from '../enums';
import { BoardState } from '../state';
import { BoardStore } from '../state/board.store';
import { BoardService } from './board.service';

@Injectable()
export class BoardSandbox {
  secretDisplay$ = this.bStore.secretDisplay$;
  highScore$ = this.bStore.highScore$;
  score$ = this.bStore.score$;
  message$ = this.bStore.message$;
  inputValue$ = this.bStore.inputValue$;
  checkBtnDisabled$ = this.bStore.checkBtnDisabled$;

  constructor(protected bStore: BoardStore, protected bService: BoardService) {}

  init(): void {
    this.bStore.init(this.generateBoardState());
  }

  startOver(): void {
    this.bStore.startOver(this.generateBoardState());
  }

  checkAnswer(inputValue: number): void {
    this.bStore.checkAnswer(inputValue);
  }

  notifyUserChangeInputValue(inputValue: number | null): void {
    this.bStore.changeUserInputValue(inputValue);
  }

  protected generateBoardState(): BoardState {
    return {
      secret: this.bService.generateSecret(),
      score: 20,
      highScore: 0,
      message: MessageEnum.INITIAL,
      inputValue: null,
    };
  }
}
