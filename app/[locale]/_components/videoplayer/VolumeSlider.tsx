"use client";
import { FC, MouseEvent, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface VolumeSliderProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  setVolume: (volume: number) => void;
  handleMute: () => void;
  isMuted: boolean;
}

export const VolumeSlider: FC<VolumeSliderProps> = ({
  videoRef,
  setVolume,
  handleMute,
  isMuted,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const currentVolume = isMuted ? 0 : videoRef.current?.volume ?? 0;

  const handleVolumeDrag = (e: MouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;

    const update = (clientX: number) => {
      const rect = bar.getBoundingClientRect();
      const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const volume = x / rect.width;
      setVolume(volume);
    };

    setIsDragging(true);
    update(e.clientX);

    const handleMove = (e: globalThis.MouseEvent) => update(e.clientX);
    const handleUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  };

  return (
    <div
      className="relative flex items-center group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handleMute}
        className="text-white focus:outline-none"
        aria-label="Mute/Unmute"
      >
        {isMuted || currentVolume === 0 ? (
          <VolumeX size={18} />
        ) : (
          <Volume2 size={18} />
        )}
      </button>

      <div
        className={`ml-2 overflow-hidden transition-all duration-300 ${
          isHovered ? "w-32 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <div
          className="relative h-1 bg-white/20 rounded-full cursor-pointer group w-full"
          onMouseDown={handleVolumeDrag}
        >
          <div
            className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-150"
            style={{ width: `${currentVolume * 100}%` }}
          />

          <div
            className={`absolute top-1/2 z-10 h-3 w-3 bg-white rounded-full shadow transition-opacity duration-200 ${
              isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
            style={{
              left: `calc(${currentVolume * 100}% - 6px)`,
              transform: "translateY(-50%)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
