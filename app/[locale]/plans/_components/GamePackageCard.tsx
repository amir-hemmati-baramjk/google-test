"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "../../_components/button/button";
import { PackageStyle } from "@/utils/package-mapping";
import { GamePackage } from "@/type/api/plans/plans.type";
import { useUser } from "@/stores/userContext";
import LoginModal from "../../create-game/_components/LoginModal";

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
  const t = useTranslations("plans");
  const { variant, textColor, IconComponent } = styles;
  const { isLogin } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const gameCount =
    parseInt(plan.name.match(/\d+/)?.[0] || plan.gamesCount.toString()) || 0;

  const displayPrice = `${plan.currency} ${plan.price.toFixed(2)}`;

  return (
    <div className="bg-white p-3 flex flex-col gap-5 rounded-[12px] text-black shadow-md border border-gray-100 transition-transform hover:scale-[1.02]">
      {/* Header Section */}
      <div
        className={`bg-${variant} flex flex-col justify-center items-center gap-3 text-white rounded-[10px] p-5 shadow-inner`}
      >
        <p className="text-xl font-bold text-center leading-tight">
          {plan.name}
        </p>

        <IconComponent size={56} />

        <p className="text-2xl font-black">{displayPrice}</p>
      </div>

      {/* Description Section */}
      <div className="flex-1 px-2">
        <p
          className={`${textColor} text-center text-sm font-bold leading-relaxed`}
        >
          {gameCount > 0
            ? t("descriptionTemplate", { count: gameCount })
            : plan.description}
        </p>
      </div>

      {/* Action Button */}
      <Button
        size="normal"
        variant={variant}
        className="w-full font-bold uppercase tracking-wide"
        onClick={() => {
          if (isLogin) {
            onChoosePackage(plan.id);
          } else {
            setShowLoginModal(true);
          }
        }}
      >
        {t("buyNow")}
      </Button>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
