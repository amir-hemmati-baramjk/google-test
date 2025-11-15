import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const InformationIcon: React.FC<IconProps> = ({
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
        d="M55.5,44.1a1.757,1.757,0,0,1,1.758,1.758v7.911a1.758,1.758,0,0,1-3.516,0V45.86A1.758,1.758,0,0,1,55.5,44.1m0-7.033a2.2,2.2,0,1,1-2.2,2.2,2.2,2.2,0,0,1,2.2-2.2"
        transform="translate(-43.304 -34.069)"
        className="fill-current"
      />
    </svg>
  );
};
