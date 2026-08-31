import { create } from 'zustand';
import { BackgroundType } from '@/types/background';

export interface BackgroundState {
  currentBackground: BackgroundType | null;
  previousBackground: BackgroundType | null;
  transitionDuration: number;
  setBackground: (background: BackgroundType, duration?: number) => void;
  getBackground: () => BackgroundType | null;
}

export const useBackgroundStore = create<BackgroundState>((set, get) => ({
  currentBackground: 'club_room_afternoon',
  previousBackground: null,
  transitionDuration: 800,

  setBackground: (background: BackgroundType, duration: number = 800) => {
    set({
      previousBackground: get().currentBackground,
      currentBackground: background,
      transitionDuration: duration,
    });
  },

  getBackground: () => get().currentBackground,
}));
