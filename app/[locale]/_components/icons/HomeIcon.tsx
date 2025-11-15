import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const HomeIcon: React.FC<IconProps> = ({ size = 24, className }) => {
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
          d="M14.4,20.1V12.9a.9.9,0,0,0-.9-.9H9.9a.9.9,0,0,0-.9.9v7.2"
          transform="translate(-3.6 -3)"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M3,9.2a1.8,1.8,0,0,1,.638-1.375l6.3-5.4a1.8,1.8,0,0,1,2.324,0l6.3,5.4A1.8,1.8,0,0,1,19.2,9.2v8.1a1.8,1.8,0,0,1-1.8,1.8H4.8A1.8,1.8,0,0,1,3,17.3Z"
          transform="translate(-3 -2.001)"
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
