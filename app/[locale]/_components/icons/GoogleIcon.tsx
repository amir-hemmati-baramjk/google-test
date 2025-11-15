import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const GoogleIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      id="Google_Icon"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
    >
      <rect width="24" height="24" fill="none" />
      <g transform="translate(0 0)">
        <path
          d="M88.4,492.2a5.674,5.674,0,0,0-4.007-1.565,6.356,6.356,0,0,0-6.188,6.313,
             6.053,6.053,0,0,0,.334,1.993,6.234,6.234,0,0,0,5.854,4.31,
             6.322,6.322,0,0,0,3.548-1,4.839,4.839,0,0,0,2.087-3.12H84.4V495.2h9.84
             a12.069,12.069,0,0,1,.167,1.972,10.225,10.225,0,0,1-3.1,7.68,
             A9.932,9.932,0,0,1,84.4,507.39a10.429,10.429,0,0,1-9.318-5.77,
             10.281,10.281,0,0,1,0-9.36A10.42,10.42,0,0,1,84.4,486.5,
             a9.952,9.952,0,0,1,6.981,2.723Z"
          transform="translate(-72.437 -484.935)"
          fill="currentColor"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
};
