/**
 * 게임 엔딩 시스템
 */

import { CharacterStats } from '@/types/scene';

export type EndingType = 'true_ending' | 'good_ending' | 'normal_ending' | 'bad_ending';

export interface EndingInfo {
  type: EndingType;
  title: string;
  description: string;
  imageUrl: string;
  duration: number;
  credits: string[];
  unlockCondition?: string;
}

export interface EndingScore {
  endingType: EndingType;
  affection: Record<string, number>;
  understanding: Record<string, number>;
  trust: Record<string, number>;
  projectProgress: number;
  playTime: number;
  scenesCompleted: number;
}

export class EndingManager {
  /**
   * 엔딩 타입 결정
   */
  static determineEnding(
    characterStats: Record<string, CharacterStats>,
    projectProgress: number
  ): EndingType {
    const avgAffection = this.calculateAverage(characterStats, 'affection');
    const avgUnderstanding = this.calculateAverage(characterStats, 'understanding');
    const avgTrust = this.calculateAverage(characterStats, 'trust');

    if (
      avgAffection >= 75 &&
      avgUnderstanding >= 85 &&
      avgTrust >= 70 &&
      projectProgress === 100
    ) {
      return 'true_ending';
    }

    if (
      avgAffection >= 55 &&
      avgUnderstanding >= 65 &&
      avgTrust >= 55 &&
      projectProgress === 100
    ) {
      return 'good_ending';
    }

    if (projectProgress === 100) {
      return 'normal_ending';
    }

    return 'bad_ending';
  }

  /**
   * 엔딩 정보 조회
   */
  static getEndingInfo(endingType: EndingType): EndingInfo {
    const endings: Record<EndingType, EndingInfo> = {
      true_ending: {
        type: 'true_ending',
        title: '진실한 결말',
        description: '모든 동료와 깊은 신뢰를 쌓고, 완벽한 스마트 하우스를 완성했다.\n이제 이들과 함께 더 나은 미래를 향해 나아갈 것이다.',
        imageUrl: '/images/endings/true_ending.png',
        duration: 10000,
        credits: ['류완', '성원', '세준', '예준', '동진'],
        unlockCondition: '모든 캐릭터와 높은 호감도 달성 + 프로젝트 완성',
      },
      good_ending: {
        type: 'good_ending',
        title: '좋은 결말',
        description: '동료들의 도움으로 스마트 하우스 프로젝트를 성공적으로 완성했다.\n모두가 함께했던 이 시간이 가장 소중한 추억이 될 것이다.',
        imageUrl: '/images/endings/good_ending.png',
        duration: 8000,
        credits: ['류완', '성원', '세준', '예준', '동진'],
        unlockCondition: '중간 이상의 호감도 달성 + 프로젝트 완성',
      },
      normal_ending: {
        type: 'normal_ending',
        title: '평범한 결말',
        description: '결국 스마트 하우스는 완성되었지만, 뭔가 아쉬운 느낌이 남는다.\n더 깊은 관계를 맺었다면 어땠을까?',
        imageUrl: '/images/endings/normal_ending.png',
        duration: 6000,
        credits: ['류완', '성원', '세준', '예준', '동진'],
      },
      bad_ending: {
        type: 'bad_ending',
        title: '나쁜 결말',
        description: '동아리는 결국 폐부되었다.\n처음부터 다시 시작할 수 있다. 이번엔 더 잘하자.',
        imageUrl: '/images/endings/bad_ending.png',
        duration: 5000,
        credits: ['류완'],
      },
    };

    return endings[endingType];
  }

  /**
   * 엔딩 점수 계산
   */
  static calculateEndingScore(
    characterStats: Record<string, CharacterStats>,
    projectProgress: number,
    playTime: number,
    scenesCompleted: number,
    endingType: EndingType
  ): EndingScore {
    return {
      endingType,
      affection: Object.entries(characterStats).reduce(
        (acc, [key, stats]) => {
          acc[key] = stats.affection;
          return acc;
        },
        {} as Record<string, number>
      ),
      understanding: Object.entries(characterStats).reduce(
        (acc, [key, stats]) => {
          acc[key] = stats.understanding;
          return acc;
        },
        {} as Record<string, number>
      ),
      trust: Object.entries(characterStats).reduce(
        (acc, [key, stats]) => {
          acc[key] = stats.trust;
          return acc;
        },
        {} as Record<string, number>
      ),
      projectProgress,
      playTime,
      scenesCompleted,
    };
  }

  /**
   * 평균값 계산
   */
  private static calculateAverage(
    characterStats: Record<string, CharacterStats>,
    stat: keyof CharacterStats
  ): number {
    const values = Object.values(characterStats).map((s) => s[stat]);
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }
}
