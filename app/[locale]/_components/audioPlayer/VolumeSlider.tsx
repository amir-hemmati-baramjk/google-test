import { FC, MouseEvent } from "react";

interface VolumeBarProps {
  volume: number; // value between 0 and 1
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onMuteChange: (isMuted: boolean) => void;
}

const VolumeBar: FC<VolumeBarProps> = ({
  volume,
  isMuted,
  onVolumeChange,
  onMuteChange,
}) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.min(Math.max(clickX / rect.width, 0), 1);
    onVolumeChange(newVolume);
    onMuteChange(newVolume === 0);
  };

  const barCount = 20;

  return (
    <div
      className="relative w-28 lg:w-36 h-6  rounded overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div
        className="absolute top-1/2 left-0 h-6 w-full flex items-center gap-[2px] px-[1px]"
        style={{ transform: "translateY(-50%)" }}
      >
        {Array.from({ length: barCount }).map((_, i) => {
          const barVolume = (i + 1) / barCount;
          const maxBarHeight = 20; // px
          const minBarHeight = 4; // px
          const height =
            minBarHeight + ((maxBarHeight - minBarHeight) * (i + 1)) / barCount;

          const isFilled = barVolume <= volume && !isMuted;

          return (
            <div
              key={i}
              className={`flex-1 ${isFilled ? "bg-primary" : "bg-primary/30"}`}
              style={{ height: `${height}px` }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VolumeBar;
