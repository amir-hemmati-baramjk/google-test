import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const LanguageIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <g transform="translate(4 4)">
        <path
          d="M1.732,3.478H4.895q.013.866.028,1.732H1.732V6.942l4.545-.056V8.66L0,8.674V.014L6.277,0V1.746H1.732Z"
          transform="translate(0 0)"
          className="fill-current"
        />
        <path
          d="M1.732,13.748V12.016H0v1.732a3.465,3.465,0,0,0,3.464,3.464h2.6V15.48h-2.6a1.794,1.794,0,0,1-1.732-1.732"
          transform="translate(0 -1.61)"
          className="fill-current"
        />
        <path
          d="M14.822,2.255A1.733,1.733,0,0,1,15.33,3.48V5.212h1.732V3.48A3.465,3.465,0,0,0,13.6.016H11V1.748h2.6a1.733,1.733,0,0,1,1.224.507"
          transform="translate(-1.474 -0.002)"
          className="fill-current"
        />
        <path
          d="M14.142,7.016H12.41L8.6,16.542h1.865l1.038-2.6h3.542l1.04,2.6h1.866Zm-1.946,5.2,1.08-2.7,1.078,2.7Z"
          transform="translate(-1.153 -0.94)"
          className="fill-current"
        />
      </g>
    </svg>
  );
};
