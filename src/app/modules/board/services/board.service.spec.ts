import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { BoardService } from '.';

describe('BoardService', () => {
  let spectator: SpectatorService<BoardService>;

  const createService = createServiceFactory(BoardService);

  beforeEach(() => (spectator = createService()));

  it('tells if the game is over', () => {
    expect(spectator.service.isGameOver(5)).toBeFalse();
    expect(spectator.service.isGameOver(0)).toBeTrue();
    expect(spectator.service.isGameOver(-1)).toBeTrue();
  });

  it('tells if input is empty', () => {
    expect(spectator.service.isEmptyInput(5)).toBeFalse();
    expect(spectator.service.isEmptyInput(0)).toBeFalse();
    expect(spectator.service.isEmptyInput(null)).toBeTrue();
  });

  it('tells if input is out of range', () => {
    expect(spectator.service.isOutOfRange(0)).toBeTrue();
    expect(spectator.service.isOutOfRange(1)).toBeFalse();
    expect(spectator.service.isOutOfRange(10)).toBeFalse();
    expect(spectator.service.isOutOfRange(20)).toBeFalse();
    expect(spectator.service.isOutOfRange(21)).toBeTrue();
  });

  it('tells if input is correct', () => {
    expect(spectator.service.isCorrectAnswer(1, 1)).toBeTrue();
    expect(spectator.service.isCorrectAnswer(1, 10)).toBeFalse();
  });

  it('resolves highscore', () => {
    expect(spectator.service.resolveHighScore(20, 10)).toBe(20);
    expect(spectator.service.resolveHighScore(10, 10)).toBe(10);
    expect(spectator.service.resolveHighScore(5, 10)).toBe(10);
  });

  it('tells if input is higher than secret', () => {
    expect(spectator.service.isHighGuessing(20, 10)).toBeTrue();
    expect(spectator.service.isHighGuessing(10, 10)).toBeFalse();
    expect(spectator.service.isHighGuessing(5, 10)).toBeFalse();
  });

  it('generates a secret', () => {
    const secret = spectator.service.generateSecret();

    expect(secret).toBeGreaterThanOrEqual(1);
    expect(secret).toBeLessThanOrEqual(20);
  });
});
