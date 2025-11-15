import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const AboutIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <g transform="translate(5.25 5.179)">
        <circle
          cx="7"
          cy="7"
          r="7"
          transform="translate(-0.25 -0.179)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M12,14.8V12"
          transform="translate(-5.01 -5.01)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M12,8h.007"
          transform="translate(-5.01 -3.806)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
