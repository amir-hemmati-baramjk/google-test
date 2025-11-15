import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const ArrowRightIcon: React.FC<IconProps> = ({
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
        d="M.206,14.319a.727.727,0,0,0,1.028.015L7.648,8.1a1.156,1.156,0,0,0,0-1.659L1.235.2A.727.727,0,0,0,.221,1.244L6.415,7.267.22,13.291a.727.727,0,0,0-.015,1.028M6.634,7.054h0"
        transform="translate(8 5)"
        className="fill-current"
      />
    </svg>
  );
};
