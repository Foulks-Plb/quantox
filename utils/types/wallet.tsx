export type Wallet = {
  total: number;
  tokens: Token[];
};

export type Token = {
  token: string; // name
  price?: number;
  value: number;
  amount: number;
  locationBlockchain?: string;
  locationApp: string;
  locationType: 'centralised' | 'decentralised';
};

export interface StoreWalletProps {
  wallet: Wallet | null;
  isLoading?: boolean;
  error?: string | null;
  getWallet?: (force?: boolean) => void;
}
