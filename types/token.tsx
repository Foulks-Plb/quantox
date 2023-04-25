export type Token = {
    token: string;
    price: number;
    value: number;
    amount: number;
    locationBlockchain?: string;
    locationApp: string;
    locationType: 'centralised' | 'decentralised';
  };