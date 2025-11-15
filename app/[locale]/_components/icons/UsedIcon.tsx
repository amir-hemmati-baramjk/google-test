import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const UsedIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <g transform="translate(3 5)">
        <path
          d="M1.738,0V5.214M0,3.476,1.738,5.214,3.476,3.476"
          transform="translate(16.511 13.904) rotate(180)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <path
          d="M2988.428,19892.9h-3.476c-3.276,0-4.918,0-5.936-1.041-1.017-.961-1.017-2.609-1.017-5.912s0-4.951,1.017-5.91c1.017-1.041,2.659-1.041,5.936-1.041h3.476c3.276,0,4.919,0,5.935,1.041,1.017.959,1.017,2.607,1.017,5.91"
          transform="translate(-2978 -19878.998)"
          className="stroke-current"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M2985.476,19891H2982"
          transform="translate(-2978.524 -19880.57)"
          className="stroke-current"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M2988.935,19891h-.435"
          transform="translate(-2979.375 -19880.57)"
          className="stroke-current"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M2978,19885h17.381"
          transform="translate(-2978 -19879.785)"
          className="stroke-current"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
};
