/**
 * 일진 대치 씬 타입 정의
 */

export interface ConfrontationScene {
  id: string;
  characterId: string; // 히로인 ID
  location: string; // 대치 위치
  timeOfDay: 'evening' | 'night';
  bullies: string[]; // 일진 캐릭터 IDs
  bulliesBoss: string; // 일진 대장 ID
  dialogue: DialogueNode[];
  choices: ConfrontationChoice[];
  successCondition?: string;
  failureConsequence?: string;
}

export interface DialogueNode {
  character: string;
  text: string;
  expression?: 'neutral' | 'angry' | 'scared' | 'determined' | 'sad' | 'confident';
  emotionPoint?: string;
}

export interface ConfrontationChoice {
  id: string;
  text: string;
  action: 'confront' | 'negotiate' | 'escape' | 'call_for_help' | 'deceive';
  affectionDelta: number;
  trustDelta: number;
  successRate: number; // 0-100
  consequence: string;
  nextSceneId?: string;
  heroineReaction?: string;
}

export type ConfrontationOutcome = 'victory' | 'draw' | 'defeat' | 'escape' | 'compromise';

export interface ConfrontationResult {
  outcome: ConfrontationOutcome;
  heroineTrust: number;
  protagonistSafety: boolean;
  bulliesDetermined: boolean;
  relationshipChange: number; // 히로인과의 관계 변화
}
