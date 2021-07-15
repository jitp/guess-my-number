import { Injectable } from '@angular/core';

@Injectable()
export class BoardService {
  isGameOver(score: number): boolean {
    return score <= 0;
  }

  isEmptyInput(value: number | null): boolean {
    return value === null;
  }

  isOutOfRange(value: number): boolean {
    return !(1 <= value && value <= 20);
  }

  isCorrectAnswer(value: number, secret: number): boolean {
    return value === secret;
  }

  resolveHighScore(highScore: number, score: number): number {
    return highScore > score ? highScore : score;
  }

  isHighGuessing(value: number, secret: number): boolean {
    return value > secret;
  }

  generateSecret(): number {
    return Math.trunc(Math.random() * 20) + 1;
  }
}
