import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const ContactUsIcon: React.FC<IconProps> = ({
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
      <g transform="translate(5.25 6.898)">
        <path
          d="M15.98,7,9.7,11a1.4,1.4,0,0,1-1.4,0L2,7"
          transform="translate(-2 -4.903)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <rect
          width="14"
          height="11"
          rx="2"
          transform="translate(-0.25 0.102)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
