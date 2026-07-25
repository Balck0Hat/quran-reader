import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export const useAudioPlayer = ({ onEnded }) => {
  const audioRef = useRef(null);
  const onEndedRef = useRef(onEnded);
  const playingKeyRef = useRef(null);
  const [playingKey, setPlayingKey] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  onEndedRef.current = onEnded;

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audio.onended = () => onEndedRef.current?.(playingKeyRef.current);
      audio.onerror = () => {
        setIsPlaying(false);
        toast.error('تعذّر تشغيل التلاوة، تحقق من اتصالك');
      };
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const playVerse = useCallback(
    (verseKey, url) => {
      const audio = getAudio();
      if (playingKeyRef.current === verseKey && !audio.paused) {
        audio.pause();
        return;
      }
      if (playingKeyRef.current === verseKey && audio.paused && audio.src) {
        audio.play().catch(() => {});
        return;
      }
      playingKeyRef.current = verseKey;
      setPlayingKey(verseKey);
      audio.src = url;
      audio.play().catch(() => {});
    },
    [getAudio]
  );

  const togglePause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.removeAttribute('src');
    }
    playingKeyRef.current = null;
    setPlayingKey(null);
    setIsPlaying(false);
  }, []);

  useEffect(() => () => audioRef.current?.pause(), []);

  return { playingKey, isPlaying, playVerse, togglePause, stop };
};
