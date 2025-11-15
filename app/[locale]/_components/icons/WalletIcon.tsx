import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const WalletIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <g transform="translate(3 3)">
        <path
          d="M14.475,3.619V7.237a3.419,3.419,0,0,1-3.619,3.619H3.619A3.419,3.419,0,0,1,0,7.237V3.619A3.368,3.368,0,0,1,3.032.043,3.852,3.852,0,0,1,3.619,0h7.237A3.31,3.31,0,0,1,11.4.036,3.376,3.376,0,0,1,14.475,3.619Z"
          transform="translate(1.447 5.066)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M8.366,3.655a3.31,3.31,0,0,0-.543-.036H.586A3.852,3.852,0,0,0,0,3.662,2.2,2.2,0,0,1,.42,3.1L2.772.738a2.551,2.551,0,0,1,3.59,0L7.628,2.019a2.442,2.442,0,0,1,.738,1.636Z"
          transform="translate(4.481 1.447)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M3.619,2.895H1.447A1.447,1.447,0,1,1,1.447,0H3.619"
          transform="translate(12.304 9.047)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
