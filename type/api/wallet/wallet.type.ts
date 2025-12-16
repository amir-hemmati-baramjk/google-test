export type WalletHistory = {
  id: string;
  userId: string;
  amount: number;
  historyType: number;
  paymentId: string | null;
  note: string;
  createDateTime: string;
};

export type Balance = {
  balance: number;
};

export type WalletDataApiResponse = {
  balance: {
    amount: 1;
    currency: null | string;
  };
  history: {
    data: WalletHistory[];
    totalCount: number;
    pageSize: number;
    pageIndex: number;
    totalPages: number;
    hasNextPage: boolean;
  };
};
