import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const ParticipantsIcon: React.FC<IconProps> = ({
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
      <g transform="translate(4 4.34)">
        <path
          d="M13.855,20.081V18.387A3.387,3.387,0,0,0,10.468,15H5.387A3.387,3.387,0,0,0,2,18.387v1.694"
          transform="translate(-2 -4.839)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M16,3.128a3.387,3.387,0,0,1,0,6.557"
          transform="translate(-4.145 -3.02)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M21.54,20.1V18.407A3.387,3.387,0,0,0,19,15.13"
          transform="translate(-4.605 -4.859)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <circle
          cx="3.5"
          cy="3.5"
          r="3.5"
          transform="translate(2.371 -0.34)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
