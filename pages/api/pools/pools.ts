import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';
import { getPrices } from '@/utils/ts/api-coingecko';
import { IPool, IWalletPool } from '@/utils/types/wallet';
import { setPools } from '@/utils/ts/wallet';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<IWalletPool>,
) {
  if (req.method === 'GET') {
    let listOfTokens = [];
    getPools(req).then((data: any) => {
      const tokenSet = new Set();
      for (let i = 0; i < data.length; i++) {
        const { tokenA, tokenB } = data[i];
        tokenSet.add(tokenA);
        tokenSet.add(tokenB);
      }

      listOfTokens = [...tokenSet];
      getPrices(listOfTokens).then((prices: any) => {
        const pools: IWalletPool = setPools(data, prices);
        res.status(200).json({
          total: pools.total,
          pools: [...pools.pools],
          individualTokens: [...pools.individualTokens],
        });
      });
    });
  }
}

async function getPools(req: NextApiRequest): Promise<IPool[]> {
  const session = await getSession({ req });
  const pools = await prisma.pool.findMany({
    where: {
      authorId: session?.user.id,
    },
  });
  return pools as IPool[];
}
