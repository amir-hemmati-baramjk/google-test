import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const RemoveIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <path
        d="M.416,8.354a1.381,1.381,0,0,0,1,.442,1.381,1.381,0,0,0,1-.442L7.45,3.021l5.025,5.333a1.363,1.363,0,0,0,1.992-.018,1.575,1.575,0,0,0,.017-2.114L9.459.889l5.025-5.333a1.559,1.559,0,0,0,.4-1.061,1.556,1.556,0,0,0-.416-1.053A1.381,1.381,0,0,0,13.474-7a1.378,1.378,0,0,0-1,.423L7.45-1.244,2.425-6.577a1.378,1.378,0,0,0-1-.423,1.381,1.381,0,0,0-.992.442A1.556,1.556,0,0,0,.017-5.5a1.559,1.559,0,0,0,.4,1.061L5.441.889.416,6.222a1.574,1.574,0,0,0,0,2.133Z"
        transform="translate(5 11)"
        className="fill-current"
      />
    </svg>
  );
};
