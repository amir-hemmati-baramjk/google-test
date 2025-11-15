import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}
export const CountriesIcon: React.FC<IconProps> = ({
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
      <g transform="translate(5.342 3.128)">
        <path
          d="M15.15,12.89l1.457,8.2a.481.481,0,0,1-.779.452l-3.442-2.583a.961.961,0,0,0-1.151,0L7.787,21.538a.481.481,0,0,1-.779-.451l1.456-8.2"
          transform="translate(-4.865 -3.176)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <ellipse
          cx="7.5"
          cy="5.5"
          rx="7.5"
          ry="5.5"
          transform="translate(-0.342 -0.128)"
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
