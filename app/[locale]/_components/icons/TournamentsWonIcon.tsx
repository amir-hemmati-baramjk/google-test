import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const TournamentsWonIcon: React.FC<IconProps> = ({
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
      <g transform="translate(4 4)">
        <path
          d="M5.317,8.146H4.073A2.073,2.073,0,1,1,4.073,4H5.317"
          transform="translate(-2 -2.341)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M18,8.146h1.244a2.073,2.073,0,0,0,0-4.146H18"
          transform="translate(-4.732 -2.341)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M4,22H17.268"
          transform="translate(-2.341 -5.415)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M9.488,14.66V16.6a1.217,1.217,0,0,1-.8,1A3.391,3.391,0,0,0,7,20.747"
          transform="translate(-2.854 -4.162)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M14,14.66V16.6a1.217,1.217,0,0,0,.8,1,3.391,3.391,0,0,1,1.683,3.143"
          transform="translate(-4.049 -4.162)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M15.951,2H6V7.8a4.976,4.976,0,1,0,9.951,0Z"
          transform="translate(-2.683 -2)"
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
