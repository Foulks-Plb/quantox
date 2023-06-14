// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { getPrices } from '@/utils/ts/api-coingecko';
import { Wallet, IToken } from '@/utils/types/wallet';
import { fixed2 } from '@/utils/ts/pipe';
import { getSession } from 'next-auth/react';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Wallet>,
) {
  if (req.method === 'GET') {
    let listOfTokens = [];
    getTokens(req).then((data: any[]) => {
      listOfTokens = [...new Set(data.map((token: IToken) => token.token))];
      getPrices(listOfTokens).then((prices: any) => {
        let totalWallet = 0;
        const tokens: IToken[] = data.map((token: IToken) => {
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
              value: fixed2(price),
            };
          }
        });
        res.status(200).json({
          total: fixed2(totalWallet),
          tokens: [...tokens],
          pools: [],
        });
      });
    });
  }
}

async function getTokens(req: NextApiRequest) {
  const session = await getSession({ req });
  const tokens = await prisma.token.findMany({
    where: {
      authorId: session?.user.id,
    },
    orderBy: {
      amount: 'asc',
    },
  });
  return tokens;
}
