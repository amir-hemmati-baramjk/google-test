import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}
export const TournamentIcon: React.FC<IconProps> = ({
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
      <g transform="translate(3 3)">
        <path
          d="M5.6,8.5H4.25a2.25,2.25,0,1,1,0-4.5H5.6"
          transform="translate(-2 -2.2)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M18,8.5h1.35a2.25,2.25,0,1,0,0-4.5H18"
          transform="translate(-3.6 -2.2)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M4,22H18.4"
          transform="translate(-2.2 -4)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M9.7,14.66v2.106a1.321,1.321,0,0,1-.873,1.089A3.68,3.68,0,0,0,7,21.266"
          transform="translate(-2.5 -3.266)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M14,14.66v2.106a1.321,1.321,0,0,0,.873,1.089A3.68,3.68,0,0,1,16.7,21.266"
          transform="translate(-3.2 -3.266)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M16.8,2H6V8.3a5.4,5.4,0,0,0,10.8,0Z"
          transform="translate(-2.4 -2)"
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
