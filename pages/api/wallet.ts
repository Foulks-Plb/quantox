// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getPrices } from '@/utils/ts/api-coingecko';
import { IWallet, IWalletPool, IWalletToken } from '@/utils/types/wallet';
import { fixed2 } from '@/utils/ts/pipe';
import { getSession } from 'next-auth/react';
import { setPools, setTokens } from '@/utils/ts/wallet';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IWallet>,
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
