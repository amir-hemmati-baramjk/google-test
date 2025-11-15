import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const ProfileIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <rect width="24" height="24" fill="none" opacity="0.52" />
      <g transform="translate(6 4)">
        <path
          d="M17.6,20.4V18.6A3.6,3.6,0,0,0,14,15H8.6A3.6,3.6,0,0,0,5,18.6v1.8"
          transform="translate(-5 -4.2)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <circle
          cx="3.6"
          cy="3.6"
          r="3.6"
          transform="translate(3.3)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
