import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const TimePauseIcon: React.FC<IconProps> = ({
  size = 24,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <g transform="translate(4 5)">
        <path
          d="M3.741,13.84H1.328C.374,13.84,0,13.485,0,12.587V1.253C0,.355.374,0,1.328,0H3.759c.954,0,1.328.355,1.328,1.253V12.587C5.087,13.485,4.713,13.84,3.741,13.84Z"
          transform="translate(0 0)"
          className="fill-current"
        />
        <path
          d="M3.741,13.84H1.328C.374,13.84,0,13.485,0,12.587V1.253C0,.355.374,0,1.328,0H3.741c.954,0,1.328.355,1.328,1.253V12.587C5.068,13.485,4.694,13.84,3.741,13.84Z"
          transform="translate(9.894 0)"
          className="fill-current"
        />
      </g>
    </svg>
  );
};
