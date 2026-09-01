/**
 * 음성 및 사운드 시스템
 */

export type SoundType = 'bgm' | 'sfx' | 'voice';

export interface AudioTrack {
  id: string;
  name: string;
  type: SoundType;
  url: string;
  volume?: number;
  loop?: boolean;
}

export class AudioManager {
  private static bgmPlayer: HTMLAudioElement | null = null;
  private static sfxPlayer: HTMLAudioElement | null = null;
  private static voicePlayer: HTMLAudioElement | null = null;
  private static bgmVolume = 0.7;
  private static sfxVolume = 0.8;
  private static voiceVolume = 1.0;
  private static masterVolume = 1.0;
  private static isMuted = false;

  /**
   * BGM 재생
   */
  static playBGM(trackUrl: string, fadeIn = true): void {
    if (!this.bgmPlayer) {
      this.bgmPlayer = new Audio();
      this.bgmPlayer.loop = true;
    }

    if (this.bgmPlayer.src === trackUrl && !this.bgmPlayer.paused) {
      return;
    }

    if (fadeIn) {
      this.bgmPlayer.volume = 0;
      this.bgmPlayer.src = trackUrl;
      this.bgmPlayer.play();
      this.fadeInAudio(this.bgmPlayer, this.bgmVolume * this.masterVolume, 1000);
    } else {
      this.bgmPlayer.volume = this.bgmVolume * this.masterVolume;
      this.bgmPlayer.src = trackUrl;
      this.bgmPlayer.play();
    }
  }

  /**
   * BGM 정지
   */
  static stopBGM(fadeOut = true): void {
    if (!this.bgmPlayer) return;

    if (fadeOut) {
      this.fadeOutAudio(this.bgmPlayer, 1000, () => {
        this.bgmPlayer?.pause();
      });
    } else {
      this.bgmPlayer.pause();
    }
  }

  /**
   * 효과음 재생
   */
  static playSFX(trackUrl: string): void {
    if (!this.sfxPlayer) {
      this.sfxPlayer = new Audio();
    }

    this.sfxPlayer.volume = this.sfxVolume * this.masterVolume;
    this.sfxPlayer.src = trackUrl;
    this.sfxPlayer.play();
  }

  /**
   * 음성 재생
   */
  static playVoice(trackUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.voicePlayer) {
        this.voicePlayer = new Audio();
      }

      this.voicePlayer.volume = this.voiceVolume * this.masterVolume;
      this.voicePlayer.src = trackUrl;
      this.voicePlayer.onended = () => resolve();
      this.voicePlayer.onerror = () => reject();
      this.voicePlayer.play();
    });
  }

  /**
   * 음성 정지
   */
  static stopVoice(): void {
    if (this.voicePlayer) {
      this.voicePlayer.pause();
      this.voicePlayer.currentTime = 0;
    }
  }

  /**
   * 볼륨 설정
   */
  static setVolume(type: SoundType, volume: number): void {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    switch (type) {
      case 'bgm':
        this.bgmVolume = clampedVolume;
        if (this.bgmPlayer) this.bgmPlayer.volume = clampedVolume * this.masterVolume;
        break;
      case 'sfx':
        this.sfxVolume = clampedVolume;
        if (this.sfxPlayer) this.sfxPlayer.volume = clampedVolume * this.masterVolume;
        break;
      case 'voice':
        this.voiceVolume = clampedVolume;
        if (this.voicePlayer) this.voicePlayer.volume = clampedVolume * this.masterVolume;
        break;
    }
  }

  /**
   * 전체 볼륨 설정
   */
  static setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    if (this.bgmPlayer) this.bgmPlayer.volume = this.bgmVolume * this.masterVolume;
    if (this.sfxPlayer) this.sfxPlayer.volume = this.sfxVolume * this.masterVolume;
    if (this.voicePlayer) this.voicePlayer.volume = this.voiceVolume * this.masterVolume;
  }

  /**
   * 음소거
   */
  static mute(mute: boolean): void {
    this.isMuted = mute;
    const volume = mute ? 0 : this.masterVolume;
    if (this.bgmPlayer) this.bgmPlayer.volume = volume * this.bgmVolume;
    if (this.sfxPlayer) this.sfxPlayer.volume = volume * this.sfxVolume;
    if (this.voicePlayer) this.voicePlayer.volume = volume * this.voiceVolume;
  }

  /**
   * 페이드 인
   */
  private static fadeInAudio(audio: HTMLAudioElement, targetVolume: number, duration: number): void {
    const startTime = Date.now();
    const startVolume = audio.volume;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      audio.volume = startVolume + (targetVolume - startVolume) * progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }

  /**
   * 페이드 아웃
   */
  private static fadeOutAudio(
    audio: HTMLAudioElement,
    duration: number,
    callback?: () => void
  ): void {
    const startTime = Date.now();
    const startVolume = audio.volume;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      audio.volume = startVolume * (1 - progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (callback) {
        callback();
      }
    };

    animate();
  }
}
