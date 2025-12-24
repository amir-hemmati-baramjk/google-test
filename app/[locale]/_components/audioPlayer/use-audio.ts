import { useEffect, useRef, useReducer } from "react";

interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isFinished: boolean;
  progress: number;
  isAudioLoaded: boolean;
  isAudioWaiting: boolean;
  volume: number;
  isMuted: boolean;
}

type AudioAction =
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "TIME_UPDATE"; currentTime: number }
  | { type: "DURATION_CHANGE"; duration: number }
  | { type: "SET_FINISHED"; isFinished: boolean }
  | { type: "SET_PROGRESS"; progress: number }
  | { type: "SET_AUDIO_LOADED"; isAudioLoaded: boolean }
  | { type: "SET_AUDIO_WAITING"; isAudioWaiting: boolean }
  | { type: "SET_VOLUME"; volume: number }
  | { type: "SET_MUTED"; isMuted: boolean };

const audioReducer = (state: AudioState, action: AudioAction): AudioState => {
  switch (action.type) {
    case "PLAY":
      return {
        ...state,
        isPlaying: true,
        isFinished: false,
        isAudioWaiting: false,
      };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "TIME_UPDATE":
      return { ...state, currentTime: action.currentTime };
    case "DURATION_CHANGE":
      return { ...state, duration: action.duration };
    case "SET_FINISHED":
      return { ...state, isFinished: action.isFinished };
    case "SET_PROGRESS":
      return { ...state, progress: action.progress };
    case "SET_AUDIO_LOADED":
      return { ...state, isAudioLoaded: action.isAudioLoaded };
    case "SET_AUDIO_WAITING":
      return { ...state, isAudioWaiting: action.isAudioWaiting };
    case "SET_VOLUME":
      return {
        ...state,
        volume: action.volume,
        isMuted: action.volume === 0,
      };
    case "SET_MUTED":
      return { ...state, isMuted: action.isMuted };
    default:
      return state;
  }
};

const useAudio = (src: string, autoplay: boolean = false) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasInteracted = useRef(false);

  const [state, dispatch] = useReducer(audioReducer, {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isFinished: false,
    progress: 0,
    isAudioLoaded: false,
    isAudioWaiting: false,
    volume: 1,
    isMuted: false,
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = src;
    audio.volume = state.volume;
    audio.muted = state.isMuted;

    const debug = (msg: string) => console.log(`[AUDIO]: ${msg}`);

    const updateProgress = () => {
      const { currentTime, duration } = audio;
      const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
      dispatch({ type: "SET_PROGRESS", progress });
    };

    const handleTimeUpdate = () => {
      dispatch({ type: "TIME_UPDATE", currentTime: audio.currentTime });
      updateProgress();
    };

    const handleDurationChange = () => {
      dispatch({ type: "DURATION_CHANGE", duration: audio.duration });
      updateProgress();
    };

    const handlePlay = () => {
      debug("play");
      dispatch({ type: "PLAY" });
    };

    const handlePause = () => {
      debug("pause");
      dispatch({ type: "PAUSE" });
    };

    const handleEnded = () => {
      debug("ended");
      dispatch({ type: "SET_FINISHED", isFinished: true });
    };

    const handleLoadedData = () => {
      debug("loadeddata");
      dispatch({ type: "SET_AUDIO_LOADED", isAudioLoaded: true });

      if (autoplay) {
        audio
          .play()
          .then(() => debug("autoplay started"))
          .catch((err) => debug(`autoplay failed: ${err.message}`));
      }
    };

    const handleWaiting = () => {
      debug("waiting");
      dispatch({ type: "SET_AUDIO_WAITING", isAudioWaiting: true });
    };

    const handlePlaying = () => {
      debug("playing");
      dispatch({ type: "SET_AUDIO_WAITING", isAudioWaiting: false });
    };

    const handleError = () => {
      debug("error!");
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("error", handleError);
    };
  }, [src, autoplay]);

  const play = () => audioRef.current?.play();
  const pause = () => audioRef.current?.pause();
  const seek = (delta: number) => {
    if (audioRef.current) audioRef.current.currentTime += delta;
  };
  const setCurrentTime = (time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
  };
  const setPlaybackRate = (rate: number) => {
    if (audioRef.current) audioRef.current.playbackRate = rate;
  };

  const setVolume = (volume: number) => {
    if (audioRef.current && hasInteracted.current) {
      audioRef.current.volume = volume;
      dispatch({ type: "SET_VOLUME", volume });
      dispatch({ type: "SET_MUTED", isMuted: volume === 0 });
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuted = !audioRef.current.muted;
      audioRef.current.muted = newMuted;
      dispatch({ type: "SET_MUTED", isMuted: newMuted });
    }
  };

  const setMuted = (muted: boolean) => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
      dispatch({ type: "SET_MUTED", isMuted: muted });
    }
  };

  const registerUserInteraction = () => {
    hasInteracted.current = true;
  };

  return {
    audioRef,
    ...state,
    play,
    pause,
    seek,
    setCurrentTime,
    setVolume,
    toggleMute,
    setMuted,
    setPlaybackRate,
    registerUserInteraction,
  };
};

export default useAudio;
