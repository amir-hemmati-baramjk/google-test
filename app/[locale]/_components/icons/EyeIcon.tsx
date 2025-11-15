import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const EyeIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <path
        d="M19.25,11.41a13.354,13.354,0,0,1-4.16,4.23A9.682,9.682,0,0,1,10,17.13c-3.56,0-6.94-2.08-9.25-5.72a5.771,5.771,0,0,1,0-5.69A13.354,13.354,0,0,1,4.91,1.49,9.682,9.682,0,0,1,10,0c3.56,0,6.94,2.09,9.25,5.72A5.771,5.771,0,0,1,19.25,11.41ZM14.04,8.57A4.04,4.04,0,1,0,10,12.61,4.035,4.035,0,0,0,14.04,8.57Z"
        transform="translate(2 3.43)"
        className="fill-current opacity-40"
      />
      <path
        d="M5.71,2.86A2.855,2.855,0,1,1,2.85,0,2.864,2.864,0,0,1,5.71,2.86Z"
        transform="translate(9.15 9.14)"
        className="fill-current"
      />
    </svg>
  );
};
