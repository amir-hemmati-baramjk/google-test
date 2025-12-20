"use client";
import React, { useEffect, useRef } from "react";

import { VolumeSlider } from "./VolumeSlider";
import { SeekBar } from "./SeekBar";
import useVideo from "./use-video";
import { VideoProps } from "./video-player.types";
import { Fullscreen, Pause, Play, RotateCcw, RotateCw } from "lucide-react";
import { secondsToHHMMSS } from "@/utils/time";

export const VideoPlayer: React.FC<VideoProps & { onEnd?: () => void }> = ({
  src,
  poster = "",
  onEnd,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    currentTime,
    duration,
    isPlaying,
    isVideoWaited,
    videoRef,
    play,
    pause,
    setCurrentTime,
    setVolume,
    seek,
    toggleMute,
    isMuted,
    showControlsTemporarily,
    showControls,
  } = useVideo(src, onEnd);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleInteraction = () => {
      showControlsTemporarily();
    };

    video.addEventListener("mousemove", handleInteraction);
    video.addEventListener("click", handleInteraction);
    video.addEventListener("touchstart", handleInteraction);

    return () => {
      video.removeEventListener("mousemove", handleInteraction);
      video.removeEventListener("click", handleInteraction);
      video.removeEventListener("touchstart", handleInteraction);
    };
  }, [showControlsTemporarily, videoRef]);

  const toggleFullscreen = async () => {
    const container = containerRef.current || videoRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const wasPlaying = !video.paused;
    const t = video.currentTime;

    if (!document.fullscreenElement) {
      await container.requestFullscreen?.();

      if (wasPlaying) {
        video.currentTime = t;
        try {
          await video.play();
        } catch {}
      }
    } else {
      await document.exitFullscreen();

      if (wasPlaying) {
        video.currentTime = t;
        try {
          await video.play();
        } catch {}
      }
    }
  };

  useEffect(() => {
    const onFsChange = () => showControlsTemporarily();
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, [showControlsTemporarily]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full max-w-full bg-black flex justify-center items-center overflow-hidden rounded-xl shadow-lg group"
      onPointerDown={showControlsTemporarily}
    >
      {isVideoWaited && (
        <div className="absolute inset-0 m-auto z-10 text-white">
          Loading...
        </div>
      )}

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full mx-auto h-full max-h-[80vh] m-auto rounded-lg bg-app-bg"
        playsInline
        onEnded={onEnd}
        controls={false}
      />

      {showControls && (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-video-overlay p-2 lg:p-4">
          <div className="flex items-center justify-between">
            <span className="text-white text-[10px] lg:text-xs">
              {secondsToHHMMSS(currentTime)}
            </span>
            <span className="text-white text-[10px] lg:text-xs">
              {secondsToHHMMSS(duration)}
            </span>
          </div>

          <div className="flex flex-col gap-1 lg:gap-2">
            <SeekBar
              currentTime={currentTime}
              duration={duration}
              setCurrentTime={setCurrentTime}
            />

            <div className="flex items-center justify-between gap-2 lg:gap-4">
              <VolumeSlider
                videoRef={videoRef}
                setVolume={setVolume}
                handleMute={toggleMute}
                isMuted={isMuted}
              />

              <div className="flex justify-center items-center gap-1 lg:gap-2">
                <button
                  onClick={() => seek(-10)}
                  className="text-white bg-primary/40 p-1 lg:p-2 rounded-full"
                  aria-label="Seek backward 10 seconds"
                >
                  <RotateCcw size={16} />
                </button>

                <button
                  onClick={!isPlaying ? play : pause}
                  className="text-white bg-primary/50 hover:bg-primary/60 p-1 lg:p-2 rounded-full"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {!isPlaying ? <Play size={16} /> : <Pause size={16} />}
                </button>

                <button
                  onClick={() => seek(10)}
                  className="text-white bg-primary/40 p-1 lg:p-2 rounded-full"
                  aria-label="Seek forward 10 seconds"
                >
                  <RotateCw size={16} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFullscreen}
                  className="text-white p-1 lg:p-2 bg-primary/30 hover:bg-primary/50 rounded-full"
                  aria-label="Toggle fullscreen"
                >
                  <Fullscreen size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
