import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const LeaderboardIcon: React.FC<IconProps> = ({
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
      <g transform="translate(4 4.562)">
        <path
          d="M9.464,3.209a.39.39,0,0,1,.684,0l2.3,4.374a.781.781,0,0,0,1.183.229l3.338-2.86a.39.39,0,0,1,.623.405l-2.212,8a.781.781,0,0,1-.746.573H4.974a.781.781,0,0,1-.747-.573l-2.211-8a.39.390,0,0,1,.623-.405l3.338,2.86A.781.781,0,0,0,7.16,7.584Z"
          transform="translate(-2.002 -3.007)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M5,21H15.927"
          transform="translate(-2.66 -6.956)"
          className="stroke-current"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};
