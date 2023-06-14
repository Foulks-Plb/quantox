// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getPrices } from '@/utils/ts/api-coingecko';
import {
  Wallet,
  IToken,
  IPool,
  IWalletPool,
  IWalletToken,
} from '@/utils/types/wallet';
import { fixed2 } from '@/utils/ts/pipe';
import { getSession } from 'next-auth/react';
import { impermLoss } from '@/utils/ts/formula';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Wallet>,
) {
  if (req.method === 'GET') {
    let listOfTokens = [];
    getTokensAndPool(req).then((data: any) => {
      const tokenSet = new Set();
      for (let i = 0; i < data.tokens.length; i++) {
        const { token } = data.tokens[i];
        tokenSet.add(token);
      }
      for (let i = 0; i < data.pools.length; i++) {
        const { tokenA, tokenB } = data.pools[i];
        tokenSet.add(tokenA);
        tokenSet.add(tokenB);
      }
      listOfTokens = [...tokenSet];

      getPrices(listOfTokens).then((prices: any) => {
        let totalWallet = 0;
        const tokens: IWalletToken = setTokens(data.tokens, prices);
        const pools: IWalletPool = setPools(data.pools, prices);
        totalWallet = tokens.total + pools.total;

        tokens.total += pools.total;
        tokens.tokens = [...tokens.tokens, ...pools.individualTokens];

        res.status(200).json({
          total: fixed2(totalWallet),
          tokens: tokens,
          pools: pools,
        });
      });
    });
  }
}

async function getTokensAndPool(req: NextApiRequest) {
  const session = await getSession({ req });

  const allTAndP = await prisma.$transaction(async (prisma) => {
    const tokens = await prisma.token.findMany({
      where: {
        authorId: session?.user.id,
      },
    });
    const pools = await prisma.pool.findMany({
      where: {
        authorId: session?.user.id,
      },
    });
    return {
      tokens: tokens,
      pools: pools,
    };
  });

  return allTAndP;
}

function setTokens(tokens: IToken[], prices: any): IWalletToken {
  let totalTokens = 0;
  const allToken: IToken[] = tokens.map((token: IToken) => {
    if (!prices[token.token]) {
      return {
        ...token,
        value: 0,
      };
    } else {
      const price = prices[token.token].usd * token.amount;
      totalTokens += price;
      return {
        ...token,
        value: fixed2(price),
      };
    }
  });
  return { tokens: allToken, total: totalTokens };
}

function setPools(pools: IPool[], prices: any): IWalletPool {
  let totalPools = 0;
  const allIndividualTokens: IToken[] = [];
  const allPool: IPool[] = pools.map((pool: IPool) => {
    const priceNowA = fixed2(prices[pool.tokenA].usd) || 0;
    const priceNowB = fixed2(prices[pool.tokenB].usd) || 0;

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
