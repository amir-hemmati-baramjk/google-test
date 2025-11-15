import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const AppleIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      id="Apple_Icon"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
    >
      <rect width="24" height="24" fill="none" />
      <g transform="translate(3.318 2.006)">
        <path
          d="M83.754,606.211c-.842,0-2.13-.89-3.5-.862a5.185,5.185,0,0,0-4.372,2.5
             c-1.866,3.04-.477,7.539,1.339,10.02.893,1.2,1.948,2.557,3.347,2.51,
             1.339-.047,1.846-.814,3.469-.814s2.069.814,3.489.786c1.451-.019,
             2.363-1.231,3.246-2.443a11.116,11.116,0,0,0,1.471-2.832,
             4.264,4.264,0,0,1-.558-7.8,5.081,5.081,0,0,0-3.865-1.97
             C86.057,605.178,84.576,606.211,83.754,606.211Zm2.972-2.538
             a4.2,4.2,0,0,0,1.106-3.173,4.812,4.812,0,0,0-3.114,1.506,
             3.983,3.983,0,0,0-1.126,3.078A4.064,4.064,0,0,0,86.726,603.673Z"
          transform="translate(-74.997 -600.5)"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
