import React from "react";

interface OrderSummaryDetailsProps {
  labels: {
    details: string;
    subtotal: string;
    discount: string;
    walletUsed: string;
    total: string;
    useWallet: string;
    balance: string;
  };
  summary: {
    packagePrice: number;
    discountedPrice: number;
    withdrawFromBalance: number;
    totalPrice: number;
    balance: number;
    currency: string;
  };
  useWallet: boolean;
  onWalletToggle: () => void;
}

export const OrderSummaryDetails: React.FC<OrderSummaryDetailsProps> = ({
  labels,
  summary,
  useWallet,
  onWalletToggle,
}) => (
  <div className="text-white">
    <p className="text-lg lg:text-2xl 18px] block mx-1 mb-2 font-semibold">
      {labels.details}
    </p>
    <div className="flex flex-col gap-3 py-4 rounded-[6px] ">
      <div className="flex justify-between items-center text-md lg:text-lg">
        <p>{labels.subtotal}</p>
        <p className="font-medium">
          {summary.packagePrice.toFixed(2)} {summary.currency}
        </p>
      </div>

      <div className="flex justify-between items-center text-md lg:text-lg">
        <p>{labels.discount}</p>
        <p className="font-medium text-red-500">
          - {summary.discountedPrice.toFixed(2)} {summary.currency}
        </p>
      </div>

      {useWallet && summary.withdrawFromBalance > 0 && (
        <div className="flex justify-between w-full items-center text-md lg:text-lg">
          <p>{labels.walletUsed}</p>
          <p className="text-red-500 font-medium">
            - {summary.withdrawFromBalance.toFixed(2)} {summary.currency}
          </p>
        </div>
      )}

      <div className="flex justify-between items-center pt-3 border-t border-white/20">
        <p className="font-bold text-lg">{labels.total}</p>
        <p className="font-bold text-lg">
          {summary.totalPrice.toFixed(2)} {summary.currency}
        </p>
      </div>

      <div className="flex gap-2 items-center pt-2 mt-2 border-t border-white/20">
        <input
          type="checkbox"
          id="useWallet"
          checked={useWallet}
          onChange={onWalletToggle}
          className="h-5 w-5 rounded border-gray-300 text-[#01797B] focus:ring-[#01797B] cursor-pointer"
        />
        <label
          htmlFor="useWallet"
          className="ml-2 text-md lg:text-md cursor-pointer"
        >
          {labels.useWallet} ({labels.balance}: {summary.balance.toFixed(2)}{" "}
          {summary.currency})
        </label>
      </div>
    </div>
  </div>
);
