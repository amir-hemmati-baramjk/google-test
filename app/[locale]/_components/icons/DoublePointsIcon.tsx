import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}
export const DoublePointsIcon: React.FC<IconProps> = ({
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
      <defs>
        <clipPath id="clip-path">
          <rect width="17.407" height="19.003" fill="none" />
        </clipPath>
      </defs>
      <g transform="translate(3 2)">
        <g clipPath="url(#clip-path)">
          <path
            d="M17.407,5.735a1.96,1.96,0,0,0-1.009-1.7L13.052,2.154,9.713.264A2.056,2.056,0,0,0,7.7.264L4.356,2.154,1.009,4.031A1.957,1.957,0,0,0,0,5.735L.007,9.5,0,13.267a1.956,1.956,0,0,0,1.009,1.705l3.347,1.876,3.339,1.889a2.047,2.047,0,0,0,2.017,0l3.339-1.889L16.4,14.972a1.96,1.96,0,0,0,1.009-1.705L17.4,9.5Zm-10.5,6.812-.994-1.837L4.866,12.547H2.445L4.619,9.456l-2.093-3H4.982l.982,1.756.959-1.756H9.344L7.216,9.478l2.152,3.069Zm7.98-1.328v1.446H9.916v-.841l1.958-1.8c.928-.853,1.182-1.226,1.182-1.735a.512.512,0,0,0-.568-.577c-.272,0-.56.094-.63.8l-.02.194H10l.021-.216a2.3,2.3,0,0,1,2.6-2.154c1.466,0,2.342.708,2.342,1.9,0,.749-.36,1.316-1.542,2.424l-.6.562Z"
            transform="translate(0 0)"
            fill="currentColor"
          />
        </g>
      </g>
      <rect width="24" height="24" fill="none" opacity="0.48" />
    </svg>
  );
};
