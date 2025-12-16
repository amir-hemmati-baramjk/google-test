import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

interface Gateway {
  paymentMethodId: number;
  paymentMethodEn: string;
  imageUrl: string;
}

interface PaymentGatewayListProps {
  gateways: Gateway[];
  selectedId?: number;
  onSelect: (gateway: Gateway) => void;
  label: string;
}

export const PaymentGatewayList: React.FC<PaymentGatewayListProps> = ({
  gateways,
  selectedId,
  onSelect,
  label,
}) => (
  <div className="flex flex-col gap-3 mt-5">
    <h2 className="text-lg font-bold text-white w-full ">{label}</h2>
    {gateways.map((item) => (
      <label
        key={item.paymentMethodId}
        className="flex justify-between w-full p-3 border border-white/20 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition"
      >
        <div className="flex items-center gap-5">
          <Image
            alt={item.paymentMethodEn}
            width={65}
            height={20}
            src={item.imageUrl}
            className="object-contain"
          />
          <p className="font-medium text-white">{item.paymentMethodEn}</p>
        </div>
        <div className="inline-flex items-center relative">
          <input
            type="checkbox"
            checked={selectedId === item.paymentMethodId}
            onChange={() => onSelect(item)}
            className="peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-white/50 checked:bg-secondary checked:border-secondary"
          />
          {selectedId === item.paymentMethodId && (
            <Check className="w-[15px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white" />
          )}
        </div>
      </label>
    ))}
  </div>
);
