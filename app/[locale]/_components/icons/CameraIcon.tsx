import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const CameraIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <rect
        width="17.327"
        height="16.113"
        rx="5"
        transform="translate(3.336 5.386)"
        className="stroke-current"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M25,7.054V5.129c0-.529.266-.962.592-.962h3.551c.325,0,.592.433.592.962V7.054"
        transform="translate(3.429 2.498)"
        className="stroke-current"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <ellipse
        cx="2.796"
        cy="2.796"
        rx="2.796"
        ry="2.796"
        transform="translate(9.203 13.951)"
        className="stroke-current"
        strokeMiterlimit="16.667"
        strokeWidth="2"
      />
    </svg>
  );
};
