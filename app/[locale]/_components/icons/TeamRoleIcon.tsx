import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const TeamRoleIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 29 29"
      className={className}
      fill="none"
    >
      <path
        d="M1067,191.766h2.29a2.772,2.772,0,0,0,2.257-1.161l.788-1.1m3.44-5.08.879-1.234a2.771,2.771,0,0,1,2.257-1.16h2.29M1079.847,180l1.929,2.029-1.929,2.028m0,5.725,1.929,2.028-1.929,2.029M1067,182.343h2.29a2.771,2.771,0,0,1,2.257,1.16l5.106,7.148a2.771,2.771,0,0,0,2.257,1.16h2.29"
        transform="translate(-1059.5 -172.5)"
        className="stroke-current"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};
