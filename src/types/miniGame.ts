/**
 * 미니게임 타입 정의
 */
export type MiniGameType = 'soldering_timing' | 'component_search' | 'code_debug';

export interface MiniGameState {
  type: MiniGameType;
  difficulty: 1 | 2 | 3;
  progress: number; // 0-100
  isComplete: boolean;
  isSuccessful: boolean;
  score: number;
  timeRemaining: number;
}

export interface MiniGameConfig {
  type: MiniGameType;
  difficulty: 1 | 2 | 3;
  timeLimit: number;
  targetScore: number;
  rewards: {
    affectionDelta: number;
    understandingDelta: number;
  };
  penalties: {
    affectionDelta: number;
    understandingDelta: number;
  };
}

// 미니게임 설정
export const MINI_GAMES: Record<MiniGameType, MiniGameConfig> = {
  soldering_timing: {
    type: 'soldering_timing',
    difficulty: 1,
    timeLimit: 10000, // 10초
    targetScore: 100,
    rewards: {
      affectionDelta: 25,
      understandingDelta: 20,
    },
    penalties: {
      affectionDelta: -10,
      understandingDelta: -5,
    },
  },
  component_search: {
    type: 'component_search',
    difficulty: 1,
    timeLimit: 15000, // 15초
    targetScore: 100,
    rewards: {
      affectionDelta: 20,
      understandingDelta: 15,
    },
    penalties: {
      affectionDelta: -5,
      understandingDelta: -10,
    },
  },
  code_debug: {
    type: 'code_debug',
    difficulty: 1,
    timeLimit: 20000, // 20초
    targetScore: 100,
    rewards: {
      affectionDelta: 20,
      understandingDelta: 25,
    },
    penalties: {
      affectionDelta: -5,
      understandingDelta: -15,
    },
  },
};
