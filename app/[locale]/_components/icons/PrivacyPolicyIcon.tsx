import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const PrivacyPolicyIcon: React.FC<IconProps> = ({
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
        d="M15.184,9.689c0,3.495-2.446,5.242-5.354,6.256a.7.7,0,0,1-.468-.007C6.446,14.931,4,13.184,4,9.689V4.8a.7.7,0,0,1,.7-.7A7.4,7.4,0,0,0,9.061,2.2a.818.818,0,0,1,1.062,0,7.37,7.37,0,0,0,4.362,1.9.7.7,0,0,1,.7.7Z"
        transform="translate(2.5 3.5)"
        className="stroke-current"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
