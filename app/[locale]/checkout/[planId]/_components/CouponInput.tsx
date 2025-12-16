import { Button } from "@/app/[locale]/_components/button/button";
import { CouponIcon } from "@/app/[locale]/_components/icons/CouponIcon";
import React from "react";

interface CouponInputProps {
  value: string;
  onChange: (val: string) => void;
  onApply: () => void;
  isLoading: boolean;
  placeholder: string;
  label: string;
}

export const CouponInput: React.FC<CouponInputProps> = ({
  value,
  onChange,
  onApply,
  isLoading,
  placeholder,
  label,
}) => (
  <div className="w-full  rounded-lg  bg-white flex items-center overflow-hidden">
    <div className="mx-2">
      <CouponIcon size={36} className="text-secondary" />
    </div>
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-2 bg-transparent border-0 outline-none text-secondary font-bold placeholder:text-gray-400"
      type="text"
    />
    <Button
      onClick={onApply}
      variant="secondary"
      isLoading={isLoading}
      disabled={isLoading}
      className="!rounded-none !px-4 lg:px-5 !font-bold"
    >
      <span className="text-[14px] py-1">{label}</span>
    </Button>
  </div>
);
