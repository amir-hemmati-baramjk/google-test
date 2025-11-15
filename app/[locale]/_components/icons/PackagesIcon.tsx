import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const PackagesIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <rect width="24" height="24" fill="none" opacity="0.52" />
      <g transform="translate(4 3)">
        <path
          d="M10.2,19.757a1.8,1.8,0,0,0,1.8,0l6.3-3.6a1.8,1.8,0,0,0,.9-1.557V7.4a1.8,1.8,0,0,0-.9-1.557L12,2.243a1.8,1.8,0,0,0-1.8,0l-6.3,3.6A1.8,1.8,0,0,0,3,7.4v7.2a1.8,1.8,0,0,0,.9,1.557Z"
          transform="translate(-3 -2.002)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M12,21V12"
          transform="translate(-3.9 -3.002)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M3.29,7l7.839,4.5L18.968,7"
          transform="translate(-3.029 -2.502)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M7.5,4.27l8.1,4.635"
          transform="translate(-3.45 -2.229)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
