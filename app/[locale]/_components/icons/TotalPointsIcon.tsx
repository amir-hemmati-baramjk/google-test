import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const TotalPointsIcon: React.FC<IconProps> = ({
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
      <g transform="translate(5 5)">
        <circle
          cx="7.5"
          cy="7.5"
          r="7.5"
          transform="translate(0)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <circle
          cx="4.5"
          cy="4.5"
          r="4.5"
          transform="translate(3 3)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <circle
          cx="1.5"
          cy="1.5"
          r="1.5"
          transform="translate(6 6)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
};
