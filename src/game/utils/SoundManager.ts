// Simple Web Audio manager that allows overlapping sounds

const soundFiles = {
  fire: '/sounds/fire.wav',
  land: '/sounds/land.wav',
  pop: '/sounds/pop_game.wav', // In app, they often use pop_game.wav or pop.mp3 for popping
  combo: '/sounds/combo.wav',
  gameover: '/sounds/gameover.wav',
  win: '/sounds/win.mp3',
  click: '/sounds/notification.wav',
  flow: '/sounds/flow.mp3',
  pour: '/sounds/pour.wav',
};

type SoundKey = keyof typeof soundFiles;

class SoundManagerClass {
  private cache: Map<SoundKey, HTMLAudioElement> = new Map();
  private enabled: boolean = true;

  constructor() {
    // Preload basic audio elements for quick cloning
    for (const [key, path] of Object.entries(soundFiles)) {
      const audio = new Audio(path);
      audio.preload = 'auto';
      this.cache.set(key as SoundKey, audio);
    }
  }

  play(key: SoundKey, volume = 1.0) {
    if (!this.enabled) return;
    try {
      const template = this.cache.get(key);
      if (template) {
        // Clone node allows overlapping playback of the same sound
        const clone = template.cloneNode() as HTMLAudioElement;
        clone.volume = volume;
        clone.play().catch(e => {
          // Ignore auto-play block errors if user hasn't interacted with page
          console.warn('Audio play blocked:', e);
        });
      }
    } catch (e) {
      console.warn('Failed to play sound:', e);
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
  
  setMuted(muted: boolean) {
    this.enabled = !muted;
  }
  
  isSoundEnabled() {
    return this.enabled;
  }
}

export const SoundManager = new SoundManagerClass();
