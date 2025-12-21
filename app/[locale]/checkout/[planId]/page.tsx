"use client";
import React, { useState, useTransition, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { getPlansById } from "@/core/plans/get-plan-service";
import { getAvailableCurrencies } from "@/core/payments/available-currencies-service";
import { fetchOrderSummary } from "@/core/payments/order-summery-service";
import { initPaymentGateways } from "@/core/payments/initial-payment-service";
import { createPaymentRequest } from "@/core/payments/createpayment-service";

import { getPackageStyle } from "@/utils/package-mapping";
import { Button } from "../../_components/button/button";
import { BackHeaderForsubPages } from "../../_components/backHeader/backHeaderForsubPages";
import { PackageVisualCard } from "./_components/PackageVisualCard";
import { CouponInput } from "./_components/CouponInput";
import { OrderSummaryDetails } from "./_components/OrderSummaryDetails";
import { PaymentGatewayList } from "./_components/PaymentGatewayList";
import { CurrencySelector } from "./_components/CurrencySelector";
import { Loading } from "../../_components/loading/loading";
import LogoMotionLoading from "../../_components/logoMotionLoading/LogoMotionLoading";

const PaymentPage: React.FC = () => {
  const { planId } = useParams();
  const t = useTranslations("checkout");
  const router = useRouter();

  const [gateways, setGateways] = useState([]);
  const [showGatewayList, setShowGatewayList] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState<any>();
  const [discountCode, setDiscountCode] = useState("");
  const [useWallet, setUseWallet] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [orderSummary, setOrderSummary] = useState<any>();

  const [isRedirecting, setIsRedirecting] = useState(false);

  const [isPendingApplyDiscount, startApplyDiscount] = useTransition();
  const [isPendingGatewayFetch, startGatewayFetch] = useTransition();

  const { data: packageResponse, isLoading: isLoadingPackage } = useQuery({
    queryKey: ["gamePackage", planId],
    queryFn: () => getPlansById({ id: planId as string }),
    enabled: !!planId,
  });

  const packageData = packageResponse?.data;
  const isDataValid = !!packageData?.id;

  const { data: currenciesResponse, isLoading: isLoadingCurrencies } = useQuery(
    {
      queryKey: ["availableCurrencies"],
      queryFn: getAvailableCurrencies,
      enabled: isDataValid,
    }
  );

  const currencies = currenciesResponse?.data?.allCournecies || [];

  useEffect(() => {
    if (isDataValid && !selectedCurrency) {
      setSelectedCurrency(packageData.currency || currencies[0] || "");
    }
  }, [isDataValid, packageData, currencies]);

  const handleFetchOrderSummary = async (applyDiscount = false) => {
    if (!isDataValid || !selectedCurrency) return;
    const res = await fetchOrderSummary({
      PackageId: packageData.id,
      PaymentMethod: 2,
      discountCode: applyDiscount ? discountCode : "",
      UseWallet: useWallet,
      Currency: selectedCurrency,
    });
    if (res.success) {
      setOrderSummary(res.data);
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    if (isDataValid && selectedCurrency) {
      startApplyDiscount(() => handleFetchOrderSummary());
    }
  }, [isDataValid, useWallet, selectedCurrency]);

  const handleOpenGateway = () => {
    startGatewayFetch(async () => {
      const currentPackageId = packageData?.id as string;

      const res = await initPaymentGateways(currentPackageId);
      if (res.success) {
        setGateways(res.data);
      }

      if (orderSummary.price === 0) {
        setIsRedirecting(true);
        const response = await createPaymentRequest({
          PackageId: currentPackageId,
          PaymentMethod: 2,
          DiscountCode: discountCode,
          UseWallet: useWallet,
          Currency: selectedCurrency,
        });
        if (response?.success) {
          router.push("/payment/success/fromDiscount");
        } else {
          setIsRedirecting(false);
          toast.error(response?.message || "Payment failed");
        }
      } else {
        setShowGatewayList(true);
      }
    });
  };

  const handleCreatePayment = async () => {
    if (!selectedGateway) {
      toast.warn(t("please-select-gateway"));
      return;
    }

    setIsRedirecting(true);
    const response = await createPaymentRequest({
      PackageId: packageData?.id as string,
      PaymentMethod: selectedGateway.paymentMethodId,
      DiscountCode: discountCode,
      UseWallet: useWallet,
      Currency: selectedCurrency,
    });

    if (response?.success && response.data?.paymentLink) {
      window.location.href = response.data.paymentLink;
    } else {
      setIsRedirecting(false);
      toast.error(response?.message || "Failed to initiate payment");
    }
  };

  if (isLoadingPackage || !packageData || !orderSummary) {
    return (
      <div className="flex justify-center py-20 w-screen h-screen items-center backdrop-blur-3xl absolute top-0 left-0 z-[1000]">
        <LogoMotionLoading />
      </div>
    );
  }

  const style = getPackageStyle(packageData?.gPointCount / 100 - 1);

  return (
    <div className="relative min-h-screen">
      {/* Full Screen Loading Overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
          <LogoMotionLoading />
        </div>
      )}

      <BackHeaderForsubPages title={t("checkout")} />

      <div className="w-full max-w-lg mx-auto p-5 pb-20">
        <PackageVisualCard
          variant={style.variant}
          name={packageData.name}
          price={`${packageData.currency} ${packageData.price?.toFixed(2)}`}
          IconComponent={style.IconComponent}
        />

        {showGatewayList ? (
          <>
            <button
              onClick={() => setShowGatewayList(false)}
              disabled={isRedirecting}
              className="text-white mb-4 underline opacity-80 hover:opacity-100 disabled:opacity-30"
            >
              &larr; {t("back-to-summary")}
            </button>
            <PaymentGatewayList
              gateways={gateways}
              selectedId={selectedGateway?.paymentMethodId}
              onSelect={setSelectedGateway}
              label={t("select-payment-method")}
            />
            <Button
              className="mt-6"
              onClick={handleCreatePayment}
              shape="full"
              size="large"
              variant="primary"
              isLoading={isRedirecting}
              disabled={!selectedGateway || isRedirecting}
            >
              {t("confirm-and-pay")}
            </Button>
          </>
        ) : (
          <div className="space-y-6">
            <CouponInput
              value={discountCode}
              onChange={setDiscountCode}
              onApply={() => handleFetchOrderSummary(true)}
              isLoading={isPendingApplyDiscount}
              placeholder={t("please-enter-coupon")}
              label={t("apply")}
            />
            <CurrencySelector
              label={t("select-currency")}
              selectedCurrency={selectedCurrency}
              currencies={currencies}
              onChange={setSelectedCurrency}
              isLoading={isLoadingCurrencies}
              disabled={isPendingApplyDiscount || isRedirecting}
            />
            <OrderSummaryDetails
              useWallet={useWallet}
              onWalletToggle={() => setUseWallet(!useWallet)}
              labels={{
                details: t("payment-details"),
                subtotal: t("sub-total"),
                discount: t("discount"),
                walletUsed: t("wallet-used"),
                total: t("total-to-pay"),
                useWallet: t("use-wallet"),
                balance: t("available-balance"),
              }}
              summary={{
                packagePrice: orderSummary.packagePrice,
                discountedPrice: orderSummary.discountedPrice || 0,
                withdrawFromBalance: orderSummary.withdrawFromBalance,
                totalPrice: orderSummary.price,
                balance: orderSummary.balance,
                currency: orderSummary.currency,
              }}
            />

            <Button
              onClick={handleOpenGateway}
              isLoading={isPendingGatewayFetch || isRedirecting}
              disabled={isPendingGatewayFetch || isRedirecting}
              shape="full"
              size="large"
              variant="primary"
            >
              {t("proceed-to-payment")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
