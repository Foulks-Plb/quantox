export type Wallet = {
  total: number;
  tokens: Token[];
  wallet?: any;
};

export type Token = {
  id?: string; // cuid
  authorId? : string; // cuid
  token: string; // name
  price?: number;
  value: number;
  amount: number;
  locationBlockchain?: string;
  locationApp: string;
  locationType: 'centralised' | 'decentralised';
};

export type IWalletPool = {
  pools: IPool[];
};

export type IPool = {
  tokenA: string;
  amountA: number;
  priceA: number;
  amountNowA?: number;
  valueNowA?: number;
  tokenB: string;
  amountB: number;
  priceB: number;
  amountNowB?: number;
  valueNowB?: number;
  impermanentLoss?: number;
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

export interface StorePoolProps {
  pool: any;
  isLoading?: boolean;
  error?: string | null;
  getPool?: (force?: boolean) => void;
}
