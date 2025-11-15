import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const ArrowLeftIcon: React.FC<IconProps> = ({
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
      <path
        d="M7.794,14.319a.727.727,0,0,1-1.028.015L.352,8.1a1.156,1.156,0,0,1,0-1.659L6.765.2A.727.727,0,0,1,7.779,1.244L1.585,7.267,7.78,13.291a.727.727,0,0,1,.015,1.028M1.366,7.054h0"
        transform="translate(10.501 8.905)"
        className="fill-current"
      />
    </svg>
  );
};
