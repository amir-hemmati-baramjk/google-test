import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const WinRateIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <path
        d="M16.711,9.355H14.887a1.471,1.471,0,0,0-1.42,1.074l-1.729,6.149a.184.184,0,0,1-.353,0L7.325,2.132a.184.184,0,0,0-.353,0L5.244,8.282A1.471,1.471,0,0,1,3.832,9.355H2"
        transform="translate(2.5 2.5)"
        className="stroke-current"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      />
    </svg>
  );
};
