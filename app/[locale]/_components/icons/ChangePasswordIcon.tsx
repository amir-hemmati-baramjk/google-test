import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const ChangePasswordIcon: React.FC<IconProps> = ({
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
      <g transform="translate(5.658 5)">
        <rect
          width="12"
          height="7"
          rx="2"
          transform="translate(0.342 6.521)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M7,8.291v-2.8a3.495,3.495,0,1,1,6.99,0v2.8"
          transform="translate(-4.204 -2)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
