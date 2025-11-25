"use client";
import { FC, MouseEvent as ReactMouseEvent, useState } from "react";

interface SeekBarProps {
  currentTime: number;
  duration: number;
  setCurrentTime: (time: number) => void;
}

export const SeekBar: FC<SeekBarProps> = ({
  currentTime,
  duration,
  setCurrentTime,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: ReactMouseEvent<HTMLDivElement>) => {
    const bar = e.currentTarget;

    const updateTime = (clientX: number) => {
      const rect = bar.getBoundingClientRect();
      const offsetX = Math.min(Math.max(clientX - rect.left, 0), rect.width);
      const newTime = (offsetX / rect.width) * duration;
      setCurrentTime(newTime);
    };

    setIsDragging(true);
    updateTime(e.clientX);

    const onMove = (e: globalThis.MouseEvent) => updateTime(e.clientX);
    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div
      className="w-full h-3 relative cursor-pointer group"
      onMouseDown={handleSeek}
    >
      {/* Background track */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-primary/20 rounded-full transform -translate-y-1/2" />

      {/* Progress bar */}
      <div
        className="absolute top-1/2 left-0 h-1 bg-primary rounded-full transition-all duration-150"
        style={{ width: `${progress}%`, transform: "translateY(-50%)" }}
      />

      <div
        className={`absolute top-1/2 z-10 h-3 w-3 bg-primary rounded-full shadow transition-opacity duration-200 ${
          isDragging
            ? "opacity-100"
            : "opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
        }`}
        style={{
          left: `calc(${progress}% - 6px)`,
          transform: "translateY(-50%)",
        }}
      />
    </div>
  );
};
