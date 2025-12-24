import { FC } from "react";
import { AudioProps } from "./audio-player.types";
import useAudio from "./use-audio";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import SeekBar from "./SeekBar";
import VolumeBar from "./VolumeSlider";
import { isIOS } from "@/utils/isIOS";

export const AudioPlayer: FC<AudioProps> = ({
  src,
  className = "",
  showVolume = true,
}) => {
  const {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    play,
    pause,
    setCurrentTime,
    setVolume,
    toggleMute,
    setMuted,
    registerUserInteraction,
  } = useAudio(src);

  const handlePlayPause = () => {
    registerUserInteraction();
    isPlaying ? pause() : play();
  };

  const handleToggleMute = () => {
    toggleMute();
  };

  return (
    <div
      className={`bg-light-blue text-white rounded-lg  p-2 w-full max-w-2xl ${className}`}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-4">
        <button
          onClick={handlePlayPause}
          className="bg-primary text-white p-2 lg:p-3 rounded-full hover:scale-105 transition-transform"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <span className="text-sm text-primary font-mono w-[50px]">
          {formatTime(currentTime)}
        </span>

        {}
        <SeekBar
          currentTime={currentTime}
          duration={duration}
          onSeek={setCurrentTime}
        />
      </div>

      {}
      <div className="flex items-center gap-3 mt-3">
        {showVolume && (
          <button
            onClick={handleToggleMute}
            className="p-2 text-primary"
            title="Mute / Unmute"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        )}
        {!isIOS() && showVolume ? (
          <VolumeBar
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={(newVolume) => setVolume(newVolume)}
            onMuteChange={(muted) => setMuted(muted)}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${secs}`;
}
