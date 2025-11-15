import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const EyeSlashIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <path
        d="M13.9,7.8a13.354,13.354,0,0,1-4.16,4.23,9.682,9.682,0,0,1-5.09,1.49A9.457,9.457,0,0,1,0,12.27L3.46,8.81A3.853,3.853,0,0,0,4.65,9,4.035,4.035,0,0,0,8.69,4.96,3.853,3.853,0,0,0,8.5,3.77L12.27,0A14.57,14.57,0,0,1,13.9,2.11a5.771,5.771,0,0,1,0,5.69Z"
        transform="translate(7.35 7.04)"
        className="fill-current opacity-40"
      />
      <path
        d="M4.88.84.84,4.88A2.9,2.9,0,0,1,0,2.86,2.866,2.866,0,0,1,2.86,0,2.9,2.9,0,0,1,4.88.84Z"
        transform="translate(9.14 9.14)"
        className="fill-current"
      />
      <path
        d="M16.25,2.32,12.86,5.71A3.986,3.986,0,0,0,10,4.53a4.045,4.045,0,0,0-2.86,6.9L3.76,14.82H3.75a14.283,14.283,0,0,1-3-3.41,5.771,5.771,0,0,1,0-5.69A13.354,13.354,0,0,1,4.91,1.49,9.774,9.774,0,0,1,10,0a9.936,9.936,0,0,1,6.25,2.32Z"
        transform="translate(2 3.43)"
        className="fill-current opacity-40"
      />
      <path
        d="M3.03.17A2.866,2.866,0,0,1,.17,3.03.5.5,0,0,1,0,3.01L3.01,0A.5.5,0,0,1,3.03.17Z"
        transform="translate(11.83 11.83)"
        className="fill-current"
      />
      <path
        d="M19.765,1.3,1.305,19.765a.758.758,0,0,1-.54.23.791.791,0,0,1-.54-.22.773.773,0,0,1,0-1.09L18.675.225a.773.773,0,0,1,1.09,0,.743.743,0,0,1,0,1.08Z"
        transform="translate(2.005 2.005)"
        className="fill-current"
      />
    </svg>
  );
};
