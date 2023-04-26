// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Token } from '@/types/token';
import prisma from '@/lib/prisma';
import { authorId } from '@/utils/constant';
import { getPricesCoingecko } from '@/utils/ts/api';

type Data = {
  total: number;
  tokens: Token[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'GET') {
    let listOfTokens = [];
    getTokens().then((data: any) => {
      listOfTokens = data.map((token: any) => token.token);
      getPrices(listOfTokens).then((prices: any) => {
        let totalWallet = 0;
        const tokens = data.map((token: any) => {
          if (!prices[token.token]) {
            return {
              ...token,
              value: 0,
            };
          } else {
            const price = prices[token.token].usd * token.amount;
            totalWallet += price;
            return {
              ...token,
              value: price,
            };
          }
        });
        res.status(200).json({
          total: totalWallet,
          tokens: [...tokens],
        });
      });
    });
  }
}

async function getTokens() {
  const tokens = await prisma.token.findMany({
    where: {
      authorId: authorId,
    },
  });
  return tokens;
}

async function getPrices(tokensArray: string[]) {
  if (tokensArray.length === 0) return;
  return await getPricesCoingecko(tokensArray.join(','));
}
