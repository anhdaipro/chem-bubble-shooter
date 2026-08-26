import { SoundManager } from './SoundManager';

/**
 * A wrapper to integrate with YouTube Playables SDK.
 * This file sets up global listeners that YouTube expects,
 * and exposes an API for our React game to hook into.
 */

// Define the expected structure from YouTube's SDK (or what we mock)
declare global {
  interface Window {
    ytPlayables?: {
      pause: () => void;
      resume: () => void;
      onPause: (callback: () => void) => void;
      onResume: (callback: () => void) => void;
      sendScore: (score: number) => void;
      saveData: (data: string) => void;
      loadData: () => Promise<string | null>;
      onAudioMute: (callback: () => void) => void;
      onAudioUnmute: (callback: () => void) => void;
    };
  }
}

class YouTubeIntegrationClass {
  private pauseCallbacks: Array<() => void> = [];
  private resumeCallbacks: Array<() => void> = [];

  constructor() {
    this.initMockIfNeeded();
    this.bindEvents();
  }

  // If the game runs outside of YouTube, we mock the SDK for testing
  private initMockIfNeeded() {
    if (!window.ytPlayables) {
      console.log('[YouTubeIntegration] Mocking ytPlayables SDK for local testing');
      window.ytPlayables = {
        pause: () => {
          this.pauseCallbacks.forEach(cb => cb());
        },
        resume: () => {
          this.resumeCallbacks.forEach(cb => cb());
        },
        onPause: (cb) => this.pauseCallbacks.push(cb),
        onResume: (cb) => this.resumeCallbacks.push(cb),
        sendScore: (score) => console.log(`[YouTube] Score sent: ${score}`),
        saveData: (data) => {
          localStorage.setItem('yt_mock_save', data);
        },
        loadData: () => Promise.resolve(localStorage.getItem('yt_mock_save')),
        onAudioMute: (cb) => cb(), 
        onAudioUnmute: (cb) => cb()
      };
    }
  }

  private bindEvents() {
    if (!window.ytPlayables) return;

    window.ytPlayables.onPause(() => {
      console.log('[YouTube] Game Paused');
      // You can implement global pause logic here, or broadcast it
    });

    window.ytPlayables.onResume(() => {
      console.log('[YouTube] Game Resumed');
    });

    window.ytPlayables.onAudioMute(() => {
      console.log('[YouTube] Audio Muted');
      SoundManager.setMuted(true);
    });

    window.ytPlayables.onAudioUnmute(() => {
      console.log('[YouTube] Audio Unmuted');
      SoundManager.setMuted(false);
    });
  }

  // --- Methods for React to consume ---

  public onPause(cb: () => void) {
    window.ytPlayables?.onPause(cb);
  }

  public onResume(cb: () => void) {
    window.ytPlayables?.onResume(cb);
  }

  public sendScore(score: number) {
    window.ytPlayables?.sendScore(score);
  }
}

export const YouTubeIntegration = new YouTubeIntegrationClass();
