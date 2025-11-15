import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}
export const SkipQuestionIcon: React.FC<IconProps> = ({
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
      <rect width="24" height="24" fill="none" opacity="0.48" />
      <g transform="translate(6.584 4.625)">
        <path
          d="M5,4l9.219,7.375L5,18.751Z"
          transform="translate(-5 -4)"
          fill="currentColor"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
        <line
          y2="13.054"
          transform="translate(12.833 0.885)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
};
