import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const AccountAdjustmentIcon: React.FC<IconProps> = ({
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
      <g transform="translate(7 6.255)">
        <path
          d="M14.786,19.194V17.8a2.8,2.8,0,0,0-2.8-2.8H7.8A2.8,2.8,0,0,0,5,17.8v1.4"
          transform="translate(-5 -6.612)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <circle
          cx="3"
          cy="3"
          r="3"
          transform="translate(1.945 -0.255)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
