import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const JoinedIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <g transform="translate(4 5.05)">
        <circle
          cx="2.696"
          cy="2.696"
          r="2.696"
          transform="translate(6.501 0)"
          className="stroke-current"
          strokeWidth="2"
        />

        <path
          d="M9.8,4.044a.267.267,0,0,1-.27.27H.27A.267.267,0,0,1,0,4.044C0,1.812,2.2,0,4.9,0S9.8,1.812,9.8,4.044Z"
          transform="translate(0 8.753)"
          className="stroke-current"
          strokeWidth="2"
        />

        <path
          d="M5,12h5.672"
          transform="translate(15.748 5.318)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M12,5v5.672"
          transform="translate(15.748 5.318)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
