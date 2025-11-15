import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const TimeResetIcon: React.FC<IconProps> = ({
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
      <g transform="translate(3 4)">
        <path
          d="M1189.435,146.391l-3.122-1.039v-4.345m7.2,7.462a8.32,8.32,0,1,1,1.109-4.156m-2.281-.913,2.078,2.078,2.078-2.078"
          transform="translate(-1178 -136)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
      </g>
    </svg>
  );
};
