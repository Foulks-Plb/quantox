import { IPool, IToken, IWalletPool, IWalletToken } from '../types/wallet';
import { impermLoss } from './formula';
import { fixed2 } from './pipe';

export function setTokens(tokens: IToken[], prices: any): IWalletToken {
  let totalTokens = 0;
  if (!prices) {
    return { tokens: [], total: 0 };
  }
  const allToken: IToken[] = tokens.map((token: IToken) => {
    if (!prices?.[token.token]) {
      return {
        ...token,
        value: 0,
      };
    } else {
      const price = prices?.[token.token]?.usd * token.amount;
      totalTokens += price;
      return {
        ...token,
        value: fixed2(price),
      };
    }
  });
  return { tokens: allToken, total: totalTokens };
}

export function setPools(pools: IPool[], prices: any): IWalletPool {
  let totalPools = 0;
  if (!prices) {
    return { pools: [], individualTokens: [], total: 0 };
  }
  const allIndividualTokens: IToken[] = [];
  const allPool: IPool[] = pools.map((pool: IPool) => {
    const priceNowA = fixed2(prices?.[pool.tokenA]?.usd) || 0;
    const priceNowB = fixed2(prices?.[pool.tokenB]?.usd) || 0;

    const { impermanentLoss, amountNowA, amountNowB } = impermLoss(
      pool.amountA,
      pool.amountB,
      pool.priceA,
      pool.priceB,
      priceNowA,
      priceNowB,
    );
    const valueNowA = fixed2(priceNowA * amountNowA);
    const valueNowB = fixed2(priceNowB * amountNowB);
    totalPools += valueNowA + valueNowB;

    allIndividualTokens.push({
      id: pool.id,
      token: pool.tokenA,
      price: priceNowA,
      value: valueNowA,
      amount: fixed2(amountNowA),
      locationBlockchain: pool.locationBlockchain,
      locationApp: pool.locationApp,
      locationType: pool.locationType,
    });
    allIndividualTokens.push({
      id: pool.id,
      token: pool.tokenB,
      price: priceNowB,
      value: valueNowB,
      amount: fixed2(amountNowB),
      locationBlockchain: pool.locationBlockchain,
      locationApp: pool.locationApp,
      locationType: pool.locationType,
    });
    return {
      ...pool,
      amountNowA: fixed2(amountNowA),
      valueNowA: valueNowA,
      priceNowA: priceNowA,
      amountNowB: fixed2(amountNowB),
      valueNowB: valueNowB,
      priceNowB: priceNowB,
      impermanentLoss: fixed2(impermanentLoss),
    };
  });
  return {
    pools: allPool,
    total: totalPools,
    individualTokens: allIndividualTokens,
  };
}
