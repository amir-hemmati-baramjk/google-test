import { useEffect, useRef, useReducer, useState } from "react";

interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isFinished: boolean;
  progress: number;
  isVideoLoaded: boolean;
  isVideoWaited: boolean;
  isMuted: boolean;
  isLocked: boolean;
}

type VideoAction =
  | { type: "PLAY" }
  | { type: "PAUSE" }
  | { type: "TIME_UPDATE"; currentTime: number }
  | { type: "DURATION_CHANGE"; duration: number }
  | { type: "SET_FINISHED"; isFinished: boolean }
  | { type: "SET_PROGRESS"; progress: number }
  | { type: "SET_VIDEO_LOADED"; isVideoLoaded: boolean }
  | { type: "SET_VIDEO_WAITED"; isVideoWaited: boolean }
  | { type: "TOGGLE_MUTE" }
  | { type: "TOGGLE_LOCK" };

const videoReducer = (state: VideoState, action: VideoAction): VideoState => {
  switch (action.type) {
    case "PLAY":
      return {
        ...state,
        isPlaying: true,
        isFinished: false,
        isVideoWaited: false,
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
    case "SET_VIDEO_LOADED":
      return { ...state, isVideoLoaded: action.isVideoLoaded };
    case "SET_VIDEO_WAITED":
      return { ...state, isVideoWaited: action.isVideoWaited };
    case "TOGGLE_MUTE":
      return { ...state, isMuted: !state.isMuted };
    case "TOGGLE_LOCK":
      return { ...state, isLocked: !state.isLocked };
    default:
      return state;
  }
};

const useVideo = (src: string, onEnd?: () => void) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onEndRef = useRef(onEnd);

  const [state, dispatch] = useReducer(videoReducer, {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isFinished: false,
    progress: 0,
    isVideoLoaded: false,
    isVideoWaited: false,
    isMuted: false,
    isLocked: false,
  });

  const [showControls, setShowControls] = useState(true);

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlTimeout.current) clearTimeout(controlTimeout.current);
    controlTimeout.current = setTimeout(() => setShowControls(false), 3000);
  };

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const { currentTime, duration } = video;
      const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
      dispatch({ type: "SET_PROGRESS", progress });
    };

    const handleTimeUpdate = () => {
      dispatch({ type: "TIME_UPDATE", currentTime: video.currentTime });
      updateProgress();
    };

    const handleDurationChange = () => {
      dispatch({ type: "DURATION_CHANGE", duration: video.duration });
      updateProgress();
    };

    const handlePlay = () => {
      dispatch({ type: "PLAY" });
      showControlsTemporarily();
    };

    const handlePause = () => dispatch({ type: "PAUSE" });

    const handleEnded = () => {
      dispatch({ type: "SET_FINISHED", isFinished: true });
      onEndRef.current?.();
    };

    const handleLoadedData = () =>
      dispatch({ type: "SET_VIDEO_LOADED", isVideoLoaded: true });
    const handleWaiting = () =>
      dispatch({ type: "SET_VIDEO_WAITED", isVideoWaited: true });
    const handlePlaying = () => {
      dispatch({ type: "SET_VIDEO_WAITED", isVideoWaited: false });
      showControlsTemporarily();
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [src]);

  const play = () => videoRef.current?.play();
  const pause = () => videoRef.current?.pause();

  const setCurrentTime = (time: number) => {
    if (videoRef.current) videoRef.current.currentTime = time;
  };

  const seek = (delta: number) => {
    if (videoRef.current) videoRef.current.currentTime += delta;
  };

  const setVolume = (volume: number) => {
    if (videoRef.current) videoRef.current.volume = volume;
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      dispatch({ type: "TOGGLE_MUTE" });
    }
  };

  const toggleLock = () => dispatch({ type: "TOGGLE_LOCK" });

  const setPlaybackRate = (rate: number) => {
    if (videoRef.current) videoRef.current.playbackRate = rate;
  };

  return {
    videoRef,
    play,
    pause,
    setCurrentTime,
    setVolume,
    toggleMute,
    toggleLock,
    setPlaybackRate,
    seek,
    showControls,
    showControlsTemporarily,
    ...state,
  };
};

export default useVideo;
