import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const CompletedTournamentsIcon: React.FC<IconProps> = ({
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
      <g transform="translate(5 5)">
        <path
          d="M4.942,7.678h-1.1A1.839,1.839,0,1,1,3.839,4h1.1"
          transform="translate(-2 -2.529)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M18,7.678h1.1A1.839,1.839,0,1,0,19.1,4H18"
          transform="translate(-6.231 -2.529)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M4,22H15.769"
          transform="translate(-2.529 -7.289)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M9.207,14.66v1.721a1.08,1.08,0,0,1-.713.89A3.008,3.008,0,0,0,7,20.059"
          transform="translate(-3.322 -5.348)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M14,14.66v1.721a1.08,1.08,0,0,0,.713.89,3.008,3.008,0,0,1,1.493,2.788"
          transform="translate(-5.173 -5.348)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M14.827,2H6V7.149a4.413,4.413,0,0,0,8.827,0Z"
          transform="translate(-3.058 -2)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
};
