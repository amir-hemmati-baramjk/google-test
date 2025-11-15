import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const AverageRatingIcon: React.FC<IconProps> = ({
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
        d="M9.006,2.217a.39.39,0,0,1,.7,0l1.7,3.442a1.562,1.562,0,0,0,1.173.853l3.8.556a.39.39,0,0,1,.216.665l-2.748,2.676A1.562,1.562,0,0,0,13.4,11.79l.649,3.781a.39.39,0,0,1-.567.412L10.08,14.2a1.561,1.561,0,0,0-1.451,0l-3.4,1.786a.39.39,0,0,1-.566-.412l.648-3.78a1.561,1.561,0,0,0-.449-1.382L2.117,7.734a.39.39,0,0,1,.216-.666l3.8-.555a1.561,1.561,0,0,0,1.175-.853Z"
        transform="translate(2.502 2.5)"
        className="stroke-current"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
      />
    </svg>
  );
};
