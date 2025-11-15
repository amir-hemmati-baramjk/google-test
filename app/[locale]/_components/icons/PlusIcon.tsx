import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const PlusIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <rect width="24" height="24" fill="none" opacity="0.52" />
      <g transform="translate(3.159 3.16)">
        <path
          d="M6.956,15.914V10.726H1.768a1.889,1.889,0,0,1,0-3.77H6.956V1.767a1.889,1.889,0,0,1,3.77,0V6.955h5.189a1.889,1.889,0,0,1,0,3.77H10.725v5.188a1.889,1.889,0,0,1-3.77,0Z"
          transform="translate(0)"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
