/**
 * 게임 씬 관리 타입 정의
 */

export type SceneType = 'intro' | 'teaching' | 'minigame' | 'confrontation' | 'ending';

export interface GameScene {
  id: string;
  type: SceneType;
  characterId?: string;
  title: string;
  backgroundId: string;
  description: string;
  dialogue: DialogueLine[];
  choices?: GameChoice[];
  nextSceneId?: string;
  affectionChange?: number;
  understandingChange?: number;
  trustChange?: number;
  triggers?: SceneTrigger[];
}

export interface DialogueLine {
  character: string;
  text: string;
  expression?: 'neutral' | 'happy' | 'sad' | 'angry' | 'embarrassed' | 'determined';
  audioUrl?: string;
}

export interface GameChoice {
  id: string;
  text: string;
  nextSceneId: string;
  affectionDelta: number;
  understandingDelta: number;
  trustDelta: number;
  condition?: SceneCondition;
}

export interface SceneTrigger {
  type: 'minigame' | 'branch' | 'ending';
  condition: SceneCondition;
  action: string;
}

export interface SceneCondition {
  characterId?: string;
  affectionMin?: number;
  affectionMax?: number;
  understandingMin?: number;
  trustMin?: number;
  completedModules?: string[];
}

export interface GameState {
  currentSceneId: string;
  characterStats: Record<string, CharacterStats>;
  completedScenes: string[];
  projectProgress: number;
  totalPlayTime: number;
  currentDate: number;
  inventory: string[];
}

export interface CharacterStats {
  affection: number;
  understanding: number;
  trust: number;
  friendship: number;
}
