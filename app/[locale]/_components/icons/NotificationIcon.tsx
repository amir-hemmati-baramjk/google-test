import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const NotificationIcon: React.FC<IconProps> = ({
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
      <g transform="translate(6 5)">
        <path
          d="M10.268,21a1.4,1.4,0,0,0,2.421,0"
          transform="translate(-5.188 -7.719)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M3.183,11.315a.7.7,0,0,0,.516,1.17H14.883a.7.7,0,0,0,.517-1.169c-.93-.958-1.915-1.977-1.915-5.121a4.194,4.194,0,1,0-8.388,0c0,3.145-.986,4.163-1.914,5.121"
          transform="translate(-3.001 -2)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
