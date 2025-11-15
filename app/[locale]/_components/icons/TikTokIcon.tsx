import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const TikTokIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      id="TikTok_Icon"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
    >
      <rect width="24" height="24" fill="none" />
      <g transform="translate(-9.46 -8.5)" fill="currentColor">
        <path
          d="M25.389,11.5H22.176V24.346a2.751,2.751,0,1,1-1.834-2.594v-3.3a5.965,5.965,0,1,0,5.048,5.894V17.81A7.76,7.76,0,0,0,29.982,19.3V16.085A4.585,4.585,0,0,1,25.389,11.5Z"
          transform="translate(0)"
        />
      </g>
    </svg>
  );
};
