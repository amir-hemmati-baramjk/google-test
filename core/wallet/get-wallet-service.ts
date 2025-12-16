import { httpService } from "../httpService";
import { WalletDataApiResponse } from "@/type/api/wallet/wallet.type";

export const getWallet = async () => {
  try {
    const response = await httpService.get<WalletDataApiResponse>(
      `/wallet?pageIndex=0&pageSize=50`
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      errors: error.message || "Failed to get Wallet data",
      data: undefined,
    };
  }
};
