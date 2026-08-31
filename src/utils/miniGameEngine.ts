/**
 * 미니게임 엔진
 */
import { MiniGameType, MiniGameState, MINI_GAMES } from '@/types/miniGame';

export class MiniGameEngine {
  /**
   * 미니게임 초기화
   */
  static initializeGame(gameType: MiniGameType, difficulty: 1 | 2 | 3): MiniGameState {
    const config = MINI_GAMES[gameType];
    return {
      type: gameType,
      difficulty,
      progress: 0,
      isComplete: false,
      isSuccessful: false,
      score: 0,
      timeRemaining: config.timeLimit,
    };
  }

  /**
   * 게임 결과 계산
   */
  static calculateResult(
    gameType: MiniGameType,
    score: number,
    timeRemaining: number
  ): { isSuccessful: boolean; finalScore: number } {
    const config = MINI_GAMES[gameType];
    const isSuccessful = score >= config.targetScore && timeRemaining > 0;
    
    // 남은 시간에 따른 보너스
    const timeBonus = Math.max(0, timeRemaining / 1000);
    const finalScore = Math.round(score + timeBonus);

    return { isSuccessful, finalScore };
  }

  /**
   * 보상/패널티 계산
   */
  static calculateRewards(
    gameType: MiniGameType,
    isSuccessful: boolean
  ): { affectionDelta: number; understandingDelta: number } {
    const config = MINI_GAMES[gameType];
    
    if (isSuccessful) {
      return config.rewards;
    } else {
      return config.penalties;
    }
  }

  /**
   * 난이도별 보상 조정
   */
  static adjustRewardsByDifficulty(
    rewards: { affectionDelta: number; understandingDelta: number },
    difficulty: 1 | 2 | 3
  ): { affectionDelta: number; understandingDelta: number } {
    const multiplier = difficulty === 1 ? 1 : difficulty === 2 ? 1.5 : 2;
    return {
      affectionDelta: Math.round(rewards.affectionDelta * multiplier),
      understandingDelta: Math.round(rewards.understandingDelta * multiplier),
    };
  }

  /**
   * 각 캐릭터에 맞는 미니게임 추천
   */
  static getRecommendedGameByCharacter(
    characterName: string
  ): MiniGameType {
    switch (characterName) {
      case '소녀':
        return 'soldering_timing';
      case '세준':
        return 'code_debug';
      case '예준':
        return 'soldering_timing';
      case '동진':
        return 'component_search';
      default:
        return 'soldering_timing';
    }
  }
}
