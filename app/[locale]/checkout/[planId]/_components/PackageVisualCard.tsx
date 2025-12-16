import React from "react";

interface PackageVisualCardProps {
  variant: string;
  name: string;
  price: string;
  IconComponent: React.ComponentType<{
    size: number;
    className?: string;
  }>;
}

export const PackageVisualCard: React.FC<PackageVisualCardProps> = ({
  variant,
  name,
  price,
  IconComponent,
}) => (
  <div className="w-full rounded-xl shadow-2xl mb-6">
    <div
      className={`bg-${variant} flex flex-col justify-center items-center gap-3 text-white rounded-lg p-6`}
    >
      <h1 className="text-xl lg:text-3xl font-extrabold text-center">{name}</h1>
      <IconComponent size={65} />
      <p className="text-xl lg:text-3xl font-black mt-2">{price}</p>
    </div>
  </div>
);
