import { create } from 'zustand';
import { GameState, CharacterStats } from '@/types/scene';

interface GameStoreState extends GameState {
  setCurrentScene: (sceneId: string) => void;
  updateCharacterStat: (characterId: string, stat: keyof CharacterStats, delta: number) => void;
  completeScene: (sceneId: string) => void;
  updateProjectProgress: (delta: number) => void;
  advanceDay: () => void;
  addInventoryItem: (item: string) => void;
  removeInventoryItem: (item: string) => void;
  resetGame: () => void;
  getCharacterStat: (characterId: string) => CharacterStats | undefined;
}

const INITIAL_STATE: GameState = {
  currentSceneId: 'scene_intro_001',
  characterStats: {
    char_001: { affection: 20, understanding: 15, trust: 25, friendship: 30 },
    char_002: { affection: 15, understanding: 20, trust: 20, friendship: 25 },
    char_003: { affection: 10, understanding: 10, trust: 15, friendship: 20 },
    char_004: { affection: 25, understanding: 12, trust: 18, friendship: 35 },
  },
  completedScenes: [],
  projectProgress: 0,
  totalPlayTime: 0,
  currentDate: 1,
  inventory: [],
};

export const useGameStore = create<GameStoreState>((set, get) => ({
  ...INITIAL_STATE,

  setCurrentScene: (sceneId: string) => {
    set({ currentSceneId: sceneId });
  },

  updateCharacterStat: (characterId: string, stat: keyof CharacterStats, delta: number) => {
    set((state) => {
      const currentStats = state.characterStats[characterId] || { affection: 0, understanding: 0, trust: 0, friendship: 0 };
      const newValue = Math.max(0, Math.min(100, currentStats[stat] + delta));
      return {
        characterStats: {
          ...state.characterStats,
          [characterId]: {
            ...currentStats,
            [stat]: newValue,
          },
        },
      };
    });
  },

  completeScene: (sceneId: string) => {
    set((state) => ({
      completedScenes: [...state.completedScenes, sceneId],
    }));
  },

  updateProjectProgress: (delta: number) => {
    set((state) => ({
      projectProgress: Math.min(100, state.projectProgress + delta),
    }));
  },

  advanceDay: () => {
    set((state) => ({
      currentDate: state.currentDate + 1,
    }));
  },

  addInventoryItem: (item: string) => {
    set((state) => ({
      inventory: [...state.inventory, item],
    }));
  },

  removeInventoryItem: (item: string) => {
    set((state) => ({
      inventory: state.inventory.filter((i) => i !== item),
    }));
  },

  resetGame: () => {
    set(INITIAL_STATE);
  },

  getCharacterStat: (characterId: string) => {
    return get().characterStats[characterId];
  },
}));
