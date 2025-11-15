import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const ActivePlayersIcon: React.FC<IconProps> = ({
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
      <rect width="24" height="24" fill="none" opacity="0.52" />
      <g transform="translate(6 4.277)">
        <path
          d="M17.181,20.22V18.48A3.48,3.48,0,0,0,13.7,15H8.48A3.48,3.48,0,0,0,5,18.48v1.74"
          transform="translate(-5 -3.658)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <ellipse
          cx="4.5"
          cy="4"
          rx="4.5"
          ry="4"
          transform="translate(1.558 -0.277)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
};
