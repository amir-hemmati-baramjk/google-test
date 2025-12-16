import { ApiResponse } from "@/core/httpSercive.types";

export interface OrderSummary {
  packageName: string;
  packageDescription: string;
  packagePrice: number;
  gamesCount: number;
  balance: number;
  price: number;
  discountedPrice: number | null;
  withdrawFromBalance: number;
  discountId: string;
  discountedPercent: number | null;
  currency: string;
}

export interface FetchOrderSummaryBody {
  PackageId: string;
  PaymentMethod: number;
  discountCode: string;
  UseWallet: boolean;
  Currency: string;
}

export interface PaymentGateway {
  paymentMethodId: number;
  paymentMethodAr: string;
  paymentMethodEn: string;
  paymentMethodCode: string;
  imageUrl: string;
  currencyIso: string;
  paymentCurrencyIso: string;
  isDirectPayment: boolean;
  isEmbeddedSupported: boolean;
  serviceCharge: number;
  totalAmount: number;
}
export interface CreatePaymentRequestBody {
  PackageId: string;
  PaymentMethod: number | string;
  DiscountCode: string;
  UseWallet: boolean;
  Currency?: string;
}
export interface initPaymentResponse extends ApiResponse<PaymentGateway[]> {
  data: PaymentGateway[];
}

export interface CreatePaymentResponse
  extends ApiResponse<{
    amount: number;
    paymentLink: string;
  }> {
  data: {
    amount: number;
    paymentLink: string;
  };
}
