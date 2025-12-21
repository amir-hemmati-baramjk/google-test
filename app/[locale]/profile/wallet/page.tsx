"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { BackHeaderForsubPages } from "../../_components/backHeader/backHeaderForsubPages";
import { TransactionItem } from "./_components/TransactionItem";
import { getWallet } from "@/core/wallet/get-wallet-service";
import LogoMotionLoading from "../../_components/logoMotionLoading/LogoMotionLoading";

export default function WalletPage() {
  const t = useTranslations("wallet");

  const {
    data: walletResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["walletData"],
    queryFn: getWallet,
  });

  const walletInfo = walletResponse?.data;
  const transactions = walletInfo?.history?.data || [];

  if (isLoading) {
    return (
      <div className="flex justify-center py-20 w-screen h-screen items-center backdrop-blur-3xl absolute top-0 left-0 z-[1000]">
        <LogoMotionLoading />
      </div>
    );
  }

  return (
    <div>
      <BackHeaderForsubPages title={t("title")} />

      <div className="w-full max-w-[500px] m-auto p-5">
        {/* Balance Card */}
        <div className="bg-secondary p-5 lg:py-10 text-white rounded-[10px] flex flex-col justify-center items-center gap-5 shadow-lg">
          <p className="font-semibold text-lg lg:text-2xl text-center">
            {t("wallet-balance")}
          </p>
          <p className="font-bold text-3xl lg:text-4xl">
            {walletInfo?.balance?.amount?.toFixed(3) || "0.000"}{" "}
            {walletInfo?.balance?.currency || "KWD"}
          </p>
        </div>

        <p className="font-bold text-2xl lg:text-3xl text-white mt-8 mb-5">
          {t("recent-transactions")}
        </p>

        <div className="flex flex-col gap-6">
          {transactions.length > 0 ? (
            transactions.map((trx: any) => (
              <TransactionItem
                key={trx.id}
                type={trx.note}
                date={trx.createDateTime}
                amount={trx.amount}
                currency={walletInfo?.balance?.currency || "KWD"}
                isCredit={trx.amount > 0}
              />
            ))
          ) : (
            <div className="mt-5 bg-white/10 text-white rounded-[10px] flex justify-center items-center py-10 font-bold text-xl lg:text-2xl">
              {t("no-transactions")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
