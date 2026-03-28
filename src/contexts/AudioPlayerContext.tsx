import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import { getAudioUrl, suraList } from '@/data/quran-metadata';

export type RepeatMode = 'none' | 'single' | 'sura';

interface PlayerState {
  currentSura: number | null;
  currentAyat: number | null;
  isPlaying: boolean;
  isPlaylist: boolean;
  duration: number;
  currentTime: number;
  volume: number;
  repeatMode: RepeatMode;
  playbackSpeed: number;
}

interface AudioPlayerContextType extends PlayerState {
  playAyat: (sura: number, ayat: number, playlist?: boolean) => void;
  togglePlay: () => void;
  seekTo: (time: number) => void;
  setVolume: (vol: number) => void;
  playNext: () => void;
  playPrev: () => void;
  stop: () => void;
  setRepeatMode: (mode: RepeatMode) => void;
  cycleRepeatMode: () => void;
  setPlaybackSpeed: (speed: number) => void;
  lastPlayed: { sura: number; ayat: number } | null;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error('useAudioPlayer must be used within AudioPlayerProvider');
  return ctx;
}

function loadLastPlayed(): { sura: number; ayat: number } | null {
  try {
    const data = localStorage.getItem('quran-last-played');
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [lastPlayed, setLastPlayed] = useState<{ sura: number; ayat: number } | null>(loadLastPlayed);
  const [state, setState] = useState<PlayerState>({
    currentSura: null,
    currentAyat: null,
    isPlaying: false,
    isPlaylist: false,
    duration: 0,
    currentTime: 0,
    volume: 1,
    repeatMode: 'none',
    playbackSpeed: 1,
  });

  // We need a ref for repeatMode so the 'ended' handler sees latest value
  const repeatModeRef = useRef(state.repeatMode);
  useEffect(() => { repeatModeRef.current = state.repeatMode; }, [state.repeatMode]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'auto';
    audioRef.current = audio;

    audio.addEventListener('timeupdate', () => {
      setState(s => ({ ...s, currentTime: audio.currentTime }));
    });
    audio.addEventListener('loadedmetadata', () => {
      setState(s => ({ ...s, duration: audio.duration }));
    });
    audio.addEventListener('error', () => {
      setState(s => ({ ...s, isPlaying: false }));
    });
    audio.addEventListener('ended', () => {
      const mode = repeatModeRef.current;
      setState(s => {
        if (mode === 'single' && s.currentSura && s.currentAyat !== null) {
          audio.currentTime = 0;
          audio.play().catch(() => {});
          return { ...s, currentTime: 0, isPlaying: true };
        }
        if ((mode === 'sura' || s.isPlaylist) && s.currentSura && s.currentAyat !== null) {
          const sura = suraList.find(su => su.number === s.currentSura);
          if (sura) {
            let nextAyat = s.currentAyat + 1;
            let nextSuraNum = s.currentSura;
            if (nextAyat > sura.ayatCount) {
              if (mode === 'sura') {
                nextAyat = s.currentSura !== 9 ? 0 : 1;
              } else {
                // Auto-transition to next sura in playlist mode
                if (s.currentSura < 114) {
                  nextSuraNum = s.currentSura + 1;
                  nextAyat = nextSuraNum !== 9 ? 0 : 1;
                } else {
                  return { ...s, isPlaying: false };
                }
              }
            }
            audio.src = getAudioUrl(nextSuraNum, nextAyat);
            audio.play().catch(() => {});
            return { ...s, currentSura: nextSuraNum, currentAyat: nextAyat, isPlaying: true, currentTime: 0, duration: 0 };
          }
        }
        return { ...s, isPlaying: false };
      });
    });

    return () => { audio.pause(); audio.src = ''; };
  }, []);

  const saveLastPlayed = useCallback((sura: number, ayat: number) => {
    const lp = { sura, ayat };
    setLastPlayed(lp);
    localStorage.setItem('quran-last-played', JSON.stringify(lp));
  }, []);

  const playAyat = useCallback((sura: number, ayat: number, playlist = false) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = getAudioUrl(sura, ayat);
    audio.volume = state.volume;
    audio.playbackRate = state.playbackSpeed;
    audio.play().catch(() => {
      setState(s => ({ ...s, isPlaying: false }));
    });
    setState(s => ({ ...s, currentSura: sura, currentAyat: ayat, isPlaying: true, isPlaylist: playlist, currentTime: 0, duration: 0 }));
    saveLastPlayed(sura, ayat);
  }, [state.volume, state.playbackSpeed, saveLastPlayed]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { audio.play(); setState(s => ({ ...s, isPlaying: true })); }
    else { audio.pause(); setState(s => ({ ...s, isPlaying: false })); }
  }, []);

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setState(s => ({ ...s, currentTime: time }));
  }, []);

  const setVolume = useCallback((vol: number) => {
    const audio = audioRef.current;
    if (audio) audio.volume = vol;
    setState(s => ({ ...s, volume: vol }));
  }, []);

  const playNext = useCallback(() => {
    setState(s => {
      if (!s.currentSura || s.currentAyat === null) return s;
      const sura = suraList.find(su => su.number === s.currentSura);
      if (sura && s.currentAyat < sura.ayatCount) {
        const next = s.currentAyat + 1;
        const audio = audioRef.current;
        if (audio) { audio.src = getAudioUrl(s.currentSura, next); audio.play(); }
        return { ...s, currentAyat: next, isPlaying: true, currentTime: 0, duration: 0 };
      }
      // Move to next sura
      if (sura && s.currentAyat >= sura.ayatCount && s.currentSura < 114) {
        const nextSura = s.currentSura + 1;
        const nextAyat = nextSura !== 9 ? 0 : 1;
        const audio = audioRef.current;
        if (audio) { audio.src = getAudioUrl(nextSura, nextAyat); audio.play(); }
        return { ...s, currentSura: nextSura, currentAyat: nextAyat, isPlaylist: true, isPlaying: true, currentTime: 0, duration: 0 };
      }
      return s;
    });
  }, []);

  const playPrev = useCallback(() => {
    setState(s => {
      if (!s.currentSura || s.currentAyat === null) return s;
      const minAyat = s.currentSura !== 9 ? 0 : 1;
      if (s.currentAyat > minAyat) {
        const prev = s.currentAyat - 1;
        const audio = audioRef.current;
        if (audio) { audio.src = getAudioUrl(s.currentSura, prev); audio.play(); }
        return { ...s, currentAyat: prev, isPlaying: true, currentTime: 0, duration: 0 };
      }
      return s;
    });
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.src = ''; }
    setState(s => ({ ...s, isPlaying: false, currentSura: null, currentAyat: null, currentTime: 0, duration: 0 }));
  }, []);

  const setRepeatMode = useCallback((mode: RepeatMode) => {
    setState(s => ({ ...s, repeatMode: mode }));
  }, []);

  const cycleRepeatMode = useCallback(() => {
    setState(s => {
      const modes: RepeatMode[] = ['none', 'single', 'sura'];
      const idx = modes.indexOf(s.repeatMode);
      return { ...s, repeatMode: modes[(idx + 1) % 3] };
    });
  }, []);

  const setPlaybackSpeed = useCallback((speed: number) => {
    const audio = audioRef.current;
    if (audio) audio.playbackRate = speed;
    setState(s => ({ ...s, playbackSpeed: speed }));
  }, []);

  return (
    <AudioPlayerContext.Provider value={{ ...state, playAyat, togglePlay, seekTo, setVolume, playNext, playPrev, stop, setRepeatMode, cycleRepeatMode, setPlaybackSpeed, lastPlayed }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}
