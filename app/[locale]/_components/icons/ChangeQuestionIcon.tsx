import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}
export const ChangeQuestionIcon: React.FC<IconProps> = ({
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
      <rect width="24" height="24" fill="none" opacity="0.48" />
      <g transform="translate(-0.583 -0.64)">
        <g transform="translate(4.583 3.64)">
          <path
            d="M10.186,2.44a7.163,7.163,0,0,0-6.036.954A7.058,7.058,0,0,0,1.606,11.77a11.261,11.261,0,0,1,.607,1.318.562.562,0,0,1-.905.443,5.011,5.011,0,0,1-.79-1.482,8.136,8.136,0,0,1,9.86-10.688c.038-.046-.3-.515-.328-.615a.564.564,0,0,1,1-.5,19.8,19.8,0,0,1,1.109,1.934.581.581,0,0,1-.3.753,16.07,16.07,0,0,1-1.873.9c-.5.177-.964-.186-.776-.7.147-.4.707-.417.981-.694"
            transform="translate(-0.001 0)"
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.5"
          />
          <path
            d="M56.605,75.335c-.038.046.3.515.328.615a.563.563,0,0,1-1.015.476A15.128,15.128,0,0,1,54.9,74.667c-.186-.386-.172-.679.225-.9a16.385,16.385,0,0,1,1.873-.9c.528-.188,1,.234.754.754-.161.341-.709.381-.958.639a7.35,7.35,0,0,0,4.025,0,7.045,7.045,0,0,0,4.554-9.331,11.23,11.23,0,0,1-.608-1.318.566.566,0,0,1,.883-.46,6.122,6.122,0,0,1,1.014,2.105A8.135,8.135,0,0,1,56.605,75.335"
            transform="translate(-50.694 -58.337)"
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.5"
          />
          <path
            d="M75.421,70.1a.637.637,0,0,1-.107-.5c.085-1.6,1.082-1.917,1.979-2.942,1.476-1.688-1.172-3.615-2.611-2.19-.347.344-.342.675-.544,1.038a.6.6,0,0,1-1.122-.329,2.873,2.873,0,0,1,.448-1.013A3.121,3.121,0,0,1,76.58,63.1,2.471,2.471,0,0,1,78.415,67c-.549.757-1.737,1.4-1.923,2.306-.059.29.029.841-.349.887a3.5,3.5,0,0,1-.568,0,.394.394,0,0,1-.154-.081"
            transform="translate(-67.558 -58.336)"
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.5"
          />
          <path
            d="M104.292,172.472a.65.65,0,1,1-.65-.65.65.65,0,0,1,.65.65"
            transform="translate(-95.296 -158.983)"
            fill="currentColor"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.5"
          />
        </g>
      </g>
    </svg>
  );
};
