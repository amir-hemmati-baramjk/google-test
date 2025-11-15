import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const TournamentsIcon: React.FC<IconProps> = ({
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
      <g transform="translate(4 4)">
        <path
          d="M5.1,7.874H3.937A1.937,1.937,0,1,1,3.937,4H5.1"
          transform="translate(-1.999 -2.45)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M18,7.874h1.162a1.937,1.937,0,1,0,0-3.874H18"
          transform="translate(-5.602 -2.45)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M4,22H16.4"
          transform="translate(-2.45 -6.503)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M9.325,14.66v1.813a1.137,1.137,0,0,1-.752.938A3.168,3.168,0,0,0,7,20.348"
          transform="translate(-3.125 -4.85)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M14,14.66v1.813a1.137,1.137,0,0,0,.752.938,3.168,3.168,0,0,1,1.573,2.937"
          transform="translate(-4.701 -4.85)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M15.3,2H6V7.424a4.649,4.649,0,0,0,9.3,0Z"
          transform="translate(-2.9 -2)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
};
