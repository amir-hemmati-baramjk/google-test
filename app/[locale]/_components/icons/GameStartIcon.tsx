import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const GameStartIcon: React.FC<IconProps> = ({
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
      <g transform="translate(4.322 3)">
        <path
          d="M8,2V5.387"
          transform="translate(-3.766 -2)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M16,2V5.387"
          transform="translate(-4.992 -2)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <rect
          width="16"
          height="16"
          rx="2"
          transform="translate(-0.322 1.249)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M3,10H18.242"
          transform="translate(-3 -3.226)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
