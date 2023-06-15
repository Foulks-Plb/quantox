export type IWallet = {
  total: number;
  tokens?: IWalletToken;
  pools?: IWalletPool;
  wallet?: any;
};

export type IWalletToken = {
  total: number;
  tokens: IToken[];
};

export type IWalletPool = {
  total: number;
  pools: IPool[];
  individualTokens: IToken[];
};

export type IToken = {
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

export type IPool = {
  id?: string; // cuid
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
  wallet: IWallet | null;
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
