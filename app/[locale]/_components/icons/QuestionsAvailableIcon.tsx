import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}
export const QuestionsAvailableIcon: React.FC<IconProps> = ({
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
      <g transform="translate(3 3.457)">
        <circle
          cx="9"
          cy="9"
          r="9"
          transform="translate(0 -0.457)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <circle
          cx="5"
          cy="5"
          r="5"
          transform="translate(4 3.543)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <circle
          cx="2"
          cy="2"
          r="2"
          transform="translate(7 6.543)"
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
