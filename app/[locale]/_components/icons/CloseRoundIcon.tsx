import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}
export const CloseRoundIcon: React.FC<IconProps> = ({
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
      <rect width="24" height="24" fill="none" opacity="0.52" />
      <path
        d="M1404,813a9,9,0,1,1,9-9A9,9,0,0,1,1404,813Zm3.18-12.182L1404,804l-3.18,3.182m6.36,0L1404,804m0,0-3.18-3.182"
        transform="translate(-1392 -792)"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
};
