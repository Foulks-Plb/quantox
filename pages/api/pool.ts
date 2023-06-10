// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';
import { getPrices } from '@/utils/ts/api-coingecko';
import { fixed2 } from '@/utils/ts/pipe';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.method === 'GET') {
    let listOfTokens = [];
    getPools(req).then((data: any) => {
      // res.status(200).json(data);
      const tokenSet = new Set();
      for (let i = 0; i < data.length; i++) {
        const { tokenA, tokenB } = data[i];
        tokenSet.add(tokenA);
        tokenSet.add(tokenB);
      }

      listOfTokens = [...tokenSet];
      getPrices(listOfTokens).then((prices: any) => {
        const pools: any[] = data.map((pool: any) => {

          const { impermanentLoss, amountNowA, amountNowB } = impermLoss(pool.amountA, pool.amountB, pool.priceA, pool.priceB, prices[pool.tokenA].usd, prices[pool.tokenB].usd);
          const valueNowA = prices[pool.tokenA].usd * amountNowA;
          const valueNowB = prices[pool.tokenB].usd * amountNowB;
          // prices[pool.tokenA] verify if not exist
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

async function getPools(req: NextApiRequest) {
  const session = await getSession({ req });
  const pools = await prisma.pool.findMany({
    where: {
      authorId: session?.user.id,
    },
    // orderBy: {
    //   amount: 'asc',
    // },
  });
  return pools;
}

function impermLoss(amountEnterA: number, amountEnterB: number, priceEnterA: number, priceEnterB: number, priceNowA: number, priceNowB: number) {
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
