/**
 * 게임 저장/로드 시스템
 */

import { GameState } from '@/types/scene';

const SAVE_PREFIX = 'visual-novel-game-save';
const MAX_SAVES = 5;

export interface SaveData {
  id: string;
  timestamp: number;
  playtime: number;
  currentDate: number;
  currentSceneId: string;
  characterStats: GameState['characterStats'];
  projectProgress: number;
}

export class SaveManager {
  /**
   * 게임 저장
   */
  static saveGame(gameState: GameState, slotId: number = 0): boolean {
    try {
      const saveData: SaveData = {
        id: `save_${slotId}`,
        timestamp: Date.now(),
        playtime: gameState.totalPlayTime,
        currentDate: gameState.currentDate,
        currentSceneId: gameState.currentSceneId,
        characterStats: gameState.characterStats,
        projectProgress: gameState.projectProgress,
      };

      const key = `${SAVE_PREFIX}_${slotId}`;
      localStorage.setItem(key, JSON.stringify(saveData));
      return true;
    } catch (error) {
      console.error('Save failed:', error);
      return false;
    }
  }

  /**
   * 게임 로드
   */
  static loadGame(slotId: number = 0): SaveData | null {
    try {
      const key = `${SAVE_PREFIX}_${slotId}`;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Load failed:', error);
      return null;
    }
  }

  /**
   * 모든 저장 데이터 조회
   */
  static getAllSaves(): SaveData[] {
    const saves: SaveData[] = [];
    for (let i = 0; i < MAX_SAVES; i++) {
      const save = this.loadGame(i);
      if (save) {
        saves.push(save);
      }
    }
    return saves;
  }

  /**
   * 저장 파일 삭제
   */
  static deleteSave(slotId: number): boolean {
    try {
      const key = `${SAVE_PREFIX}_${slotId}`;
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Delete failed:', error);
      return false;
    }
  }

  /**
   * 자동 저장
   */
  static autoSave(gameState: GameState): boolean {
    return this.saveGame(gameState, -1);
  }

  /**
   * 자동 저장 불러오기
   */
  static loadAutoSave(): SaveData | null {
    return this.loadGame(-1);
  }

  /**
   * 플레이 시간 포맷
   */
  static formatPlaytime(milliseconds: number): string {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));

    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    }
    if (minutes > 0) {
      return `${minutes}분 ${seconds}초`;
    }
    return `${seconds}초`;
  }
}
