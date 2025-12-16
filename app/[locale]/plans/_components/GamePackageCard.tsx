"use client";
import React from "react";
import Image from "next/image";
import { Button } from "../../_components/button/button";
import { PackageStyle } from "@/utils/package-mapping";
import { GamePackage } from "@/type/api/plans/plans.type";

interface GamePackageCardProps {
  plan: GamePackage;
  styles: PackageStyle;
  onChoosePackage: (planId: string) => void;
}

export default function GamePackageCard({
  plan,
  styles,
  onChoosePackage,
}: GamePackageCardProps) {
  const { variant, textColor, IconComponent } = styles;

  const gameCountText =
    plan.name.match(/\d+/)?.[0] || plan.gamesCount.toString();
  const gameCount = parseInt(gameCountText) || 0;
  const gameDisplay =
    gameCount > 0 ? `${gameCount} Game${gameCount > 1 ? "s" : ""}` : "Package";

  const displayPrice = `${plan.currency} ${plan.price.toFixed(2)}`;

  return (
    <div className="bg-white p-3 flex flex-col gap-5 rounded-lg text-black">
      <div
        className={`bg-${variant}  flex flex-col justify-center items-center gap-3 text-white rounded-lg p-4`}
      >
        <p className="text-2xl font-semibold text-center">{plan.name}</p>

        <IconComponent size={60} />

        <p className="text-3xl font-bold ">{displayPrice}</p>
      </div>

      {/* Description/Features */}
      <div className="flex-1">
        <p className={`${textColor} text-center font-medium`}>
          {gameCount > 0
            ? `This Package Allows You To Create ${gameCount} Game${
                gameCount > 1 ? "s" : ""
              }.`
            : plan.description}
        </p>
      </div>

      <Button
        size="normal"
        variant={variant}
        className="mt-5"
        onClick={() => onChoosePackage(plan.id)}
      >
        Choose Package
      </Button>
    </div>
  );
}
