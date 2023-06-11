import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';
import { getPrices } from '@/utils/ts/api-coingecko';
import { fixed2 } from '@/utils/ts/pipe';
import { IPool, IWalletPool } from '@/utils/types/wallet';
import { IImpermanentLoss } from '@/utils/types/formula';

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
        const pools: IPool[] = data.map((pool: IPool) => {

          const priceNowA = prices[pool.tokenA].usd || 0;
          const priceNowB = prices[pool.tokenB].usd || 0;

          const { impermanentLoss, amountNowA, amountNowB } = impermLoss(pool.amountA, pool.amountB, pool.priceA, pool.priceB, priceNowA, priceNowB);
          const valueNowA = priceNowA * amountNowA;
          const valueNowB = priceNowB * amountNowB;

          return {
            ...pool,
            amountNowA: fixed2(amountNowA),
            valueNowA: fixed2(valueNowA),
            priceNowA: fixed2(prices[pool.tokenA].usd),
            amountNowB: fixed2(amountNowB),
            valueNowB: fixed2(valueNowB),
            priceNowB: fixed2(prices[pool.tokenB].usd),
            impermanentLoss: fixed2(impermanentLoss),
          };
        });
        res.status(200).json({
          pools: [...pools],
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

function impermLoss(amountEnterA: number, amountEnterB: number, priceEnterA: number, priceEnterB: number, priceNowA: number, priceNowB: number): IImpermanentLoss {
  const ratioEnter = priceEnterA / priceEnterB;
  const ratioNow = priceNowA / priceNowB;

  const ratioEnterA = Math.sqrt(ratioEnter / ratioEnter);
  const ratioEnterB = Math.sqrt(ratioEnter * ratioEnter);

  const changeNowRatioA = Math.sqrt(ratioEnter / ratioNow);
  const changeNowRatioB = Math.sqrt(ratioEnter * ratioNow);

  return {
    impermanentLoss: -1 * (((changeNowRatioA * priceNowA + changeNowRatioB * priceNowB) / (1 * priceNowA + ratioEnter * priceNowB)) * 100 - 100),
    amountNowA: amountEnterA * (changeNowRatioA / ratioEnterA),
    amountNowB: amountEnterB * (changeNowRatioB / ratioEnterB),
  };
}
