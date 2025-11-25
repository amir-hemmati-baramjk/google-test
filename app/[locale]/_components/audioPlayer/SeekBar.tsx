import { FC, MouseEvent } from "react";

interface SeekBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const SeekBar: FC<SeekBarProps> = ({ currentTime, duration, onSeek }) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    onSeek(newTime);
  };

  return (
    <div
      className="relative flex-1 h-10  rounded overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div
        className="absolute top-1/2 left-0 h-6 w-full flex items-center gap-[2px] px-[1px]"
        style={{ transform: "translateY(-50%)" }}
      >
        {[...Array(60)].map((_, i) => {
          const barProgress = (i / 59) * 100;
          const height = Math.floor(Math.random() * 20) + 4;
          const isPlayed = barProgress <= progress;

          return (
            <div
              key={i}
              className={`flex-1 ${isPlayed ? "bg-primary" : "bg-primary/30"}`}
              style={{ height }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SeekBar;
