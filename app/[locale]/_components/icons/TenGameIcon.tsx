import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}
export const TenGameIcon: React.FC<IconProps> = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <rect width="24" height="24" fill="none" />
      <g transform="translate(3 4)">
        <path
          d="M197.672,64.177h-4.784a.811.811,0,0,1-.915-.7c-.458-1.606-.915-3.221-1.373-4.827a1.213,1.213,0,0,1,.76-1.537,1.252,1.252,0,0,1,.734-.017c.648.155,1.287.311,1.934.475a.189.189,0,0,0,.225-.069q1.231-1.541,2.47-3.083a1.217,1.217,0,0,1,1.7-.285,1.117,1.117,0,0,1,.285.285q1.231,1.541,2.47,3.083a.179.179,0,0,0,.225.078q.946-.246,1.891-.466a1.211,1.211,0,0,1,1.485.855,1.242,1.242,0,0,1-.009.665c-.458,1.649-.941,3.29-1.416,4.939a.789.789,0,0,1-.838.622h-4.836"
          transform="translate(-189.166 -50.732)"
          fill="currentColor"
        />
        <path
          d="M197.92,67.37h4.819a.8.8,0,0,1,.829.769.851.851,0,0,1-.06.328.778.778,0,0,1-.7.509h-9.68a.858.858,0,0,1-.7-.268.806.806,0,0,1,.069-1.14.781.781,0,0,1,.553-.2h4.862"
          transform="translate(-189.397 -52.569)"
          fill="currentColor"
        />
        <path
          d="M199.658,51.249a1.019,1.019,0,1,1-1.019-1.019,1.021,1.021,0,0,1,1.019,1.019"
          transform="translate(-190.133 -50.23)"
          fill="currentColor"
        />
        <path
          d="M189.952,56.241a1.01,1.01,0,1,1,1.019-1.019v.017a1,1,0,0,1-.984,1h-.026"
          transform="translate(-188.95 -50.774)"
          fill="currentColor"
        />
        <path
          d="M207.32,56.241a1.01,1.01,0,1,1,1.01-1.01,1.006,1.006,0,0,1-1.01,1.01h0"
          transform="translate(-191.319 -50.774)"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
