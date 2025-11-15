import React from "react";

interface IconProps {
  size?: number;
  className?: string;
}

export const QuestionsIcon: React.FC<IconProps> = ({
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
      <circle
        cx="7.78"
        cy="7.78"
        r="7.78"
        transform="translate(4 4)"
        className="stroke-current"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M75.577,70.562a.678.678,0,0,1-.114-.531c.091-1.705,1.153-2.041,2.107-3.133,1.572-1.8-1.248-3.849-2.78-2.332-.37.366-.364.719-.58,1.105a.643.643,0,0,1-1.195-.35,3.059,3.059,0,0,1,.477-1.078A3.323,3.323,0,0,1,76.812,63.1a2.631,2.631,0,0,1,1.953,4.151c-.584.806-1.85,1.488-2.048,2.455-.063.309.031.9-.372.944a3.721,3.721,0,0,1-.6,0,.421.421,0,0,1-.164-.087"
        transform="translate(5.65 7.751)"
        className="fill-current stroke-current"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.5"
      />
      <path
        d="M104.376,172.514a.692.692,0,1,1-.692-.692.692.692,0,0,1,.692.692"
        transform="translate(1.057 20.347)"
        className="fill-current stroke-current"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="0.5"
      />
    </svg>
  );
};
