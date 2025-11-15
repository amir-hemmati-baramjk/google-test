import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const PrizeIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <g transform="translate(3.629 3.654)">
        <circle
          cx="5"
          cy="5"
          r="5"
          transform="translate(0.371 -0.236)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M16.9,10.37a5.081,5.081,0,1,1-6.562,6.461"
          transform="translate(-3.278 -3.283)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M7,6h.847V9.387"
          transform="translate(-2.766 -2.613)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M16.385,13.88l.593.6L14.59,16.869"
          transform="translate(-3.929 -3.821)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
