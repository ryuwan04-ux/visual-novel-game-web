import { Background, BackgroundType, BACKGROUNDS } from '@/types/background';

export class BackgroundManager {
  static getBackground(backgroundId: BackgroundType): Background {
    return BACKGROUNDS[backgroundId];
  }

  static getAllBackgrounds(): Background[] {
    return Object.values(BACKGROUNDS);
  }

  static getBackgroundsByTimeOfDay(
    timeOfDay: 'morning' | 'afternoon' | 'evening'
  ): Background[] {
    return Object.values(BACKGROUNDS).filter(
      (bg) => bg.id.includes(timeOfDay)
    );
  }

  static getBackgroundsByLocation(location: string): Background[] {
    return Object.values(BACKGROUNDS).filter(
      (bg) => bg.id.includes(location)
    );
  }

  static getBackgroundsByMood(mood: string): Background[] {
    return Object.values(BACKGROUNDS).filter(
      (bg) => bg.ambiance?.mood.includes(mood)
    );
  }

  static getBackgroundsByLighting(
    lighting: 'bright' | 'normal' | 'dim' | 'dark'
  ): Background[] {
    return Object.values(BACKGROUNDS).filter(
      (bg) => bg.ambiance?.lighting === lighting
    );
  }

  static getBGMTrack(backgroundId: BackgroundType): string | undefined {
    return this.getBackground(backgroundId).ambiance?.bgmTrack;
  }

  static getTransitionClass(fromBg: BackgroundType, toBg: BackgroundType): string {
    const fromLocation = fromBg.split('_')[0];
    const toLocation = toBg.split('_')[0];
    return fromLocation === toLocation ? 'bg-fade' : 'bg-slide';
  }
}
